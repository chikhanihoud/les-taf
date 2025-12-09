import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Download, Lock, ArrowLeft, Trash2, RefreshCw, AlertCircle } from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  date: string;
  source: 'online' | 'local';
}

interface DashboardProps {
  onBack: () => void;
}

// Your specific Google Sheet ID
const SHEET_ID = "1gneXzNvghWp39gcBDzrF80LHCnv5cUNJCnTH1DeT_AA";
const CSV_EXPORT_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;

export const Dashboard: React.FC<DashboardProps> = ({ onBack }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const fetchLeads = async () => {
    setIsLoading(true);
    setError(null);
    
    // 1. Fetch Local Storage (Always available)
    const localData = JSON.parse(localStorage.getItem('leads') || '[]');
    const localLeads: Lead[] = localData.map((l: any) => ({ ...l, source: 'local' as const }));
    
    let sheetLeads: Lead[] = [];

    try {
        // 2. Fetch from Google Sheets (Global Data)
        const response = await fetch(CSV_EXPORT_URL);
        
        // If response redirects to login (HTML), it means the sheet is not public
        const contentType = response.headers.get("content-type");
        if (!response.ok || (contentType && contentType.includes("text/html"))) {
             throw new Error("Accès refusé. Assurez-vous que le Google Sheet est partagé avec 'Tous les utilisateurs disposant du lien' (Lecteur).");
        }
        
        const csvText = await response.text();
        const rows = csvText.split('\n');
        
        // Simple CSV parser
        sheetLeads = rows.slice(1) // Skip header
            .filter(row => row.trim() !== '')
            .map((row, index): Lead | null => {
                // Split by comma, handling potential quotes roughly
                // For a robust app, use a CSV library. Here we assume simple inputs.
                const cols = row.split(',').map(cell => cell.trim().replace(/^"|"$/g, ''));
                
                // If row looks empty or too short, skip or handle gracefully
                if (cols.length < 3) return null;

                return {
                    id: `sheet-${index}`,
                    date: cols[0] || '',
                    name: cols[1] || '',
                    email: cols[2] || '',
                    phone: cols[3] || '',
                    company: cols[4] || '',
                    source: 'online'
                };
            })
            .filter((l): l is Lead => l !== null);

    } catch (e: any) {
        console.error("Error fetching leads from sheet", e);
        setError(`Info: Impossible de charger les leads du Cloud (${e.message || 'Erreur inconnue'}). Seuls les tests locaux sont affichés.`);
    } finally {
        // 3. Merge both sources
        // We prioritize showing data. Even if sheet fails, show local.
        const allLeads = [...localLeads, ...sheetLeads];
        
        // Sort by date (newest first) - simplistic string sort usually works for ISO dates, 
        // but for mixed formats we just put them together.
        setLeads(allLeads.reverse());
        setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchLeads();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'bastila222') {
      setIsAuthenticated(true);
    } else {
      alert('Mot de passe incorrect');
    }
  };

  const handleDeleteLocal = (id: string) => {
     // Check if it's the second click
     if (deleteConfirmId === id) {
        const localData = JSON.parse(localStorage.getItem('leads') || '[]');
        const updatedData = localData.filter((l: any) => l.id !== id);
        localStorage.setItem('leads', JSON.stringify(updatedData));
        setDeleteConfirmId(null);
        fetchLeads(); // Refresh
     } else {
         // First click - ask for confirmation
         setDeleteConfirmId(id);
         // Reset confirmation after 3 seconds
         setTimeout(() => setDeleteConfirmId(null), 3000);
     }
  };

  const handleDownloadCSV = () => {
    const headers = ['Date', 'Nom', 'Email', 'Téléphone', 'Société', 'Source'];
    const csvContent = [
      headers.join(','),
      ...leads.map(lead => [
        `"${lead.date}"`,
        `"${lead.name}"`,
        `"${lead.email}"`,
        `"${lead.phone}"`,
        `"${lead.company}"`,
        `"${lead.source}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `leads_export_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-brand-deepBlue flex items-center justify-center p-4">
        <div className="bg-white rounded-xl p-8 shadow-2xl max-w-md w-full text-center space-y-6">
          <div className="w-16 h-16 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto text-brand-blue">
            <Lock size={32} />
          </div>
          <h2 className="text-2xl font-bold text-brand-deepBlue">Accès Admin</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-brand-blue focus:ring-2 outline-none"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" className="w-full justify-center">Connexion</Button>
          </form>
          <button onClick={onBack} className="text-gray-500 hover:text-brand-blue text-sm underline">
            Retour au site
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
              <ArrowLeft size={24} className="text-brand-deepBlue" />
            </button>
            <h1 className="text-3xl font-bold text-brand-deepBlue">Dashboard Leads</h1>
          </div>
          <div className="flex gap-4">
            <Button onClick={fetchLeads} variant="secondary" className="flex items-center gap-2">
              <RefreshCw size={20} className={isLoading ? 'animate-spin' : ''} /> Actualiser
            </Button>
            <Button onClick={handleDownloadCSV} className="flex items-center gap-2">
              <Download size={20} /> Exporter CSV
            </Button>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
             <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
             <div className="text-sm text-blue-800">
                 <p className="font-bold">Vue Combinée</p>
                 <p>Ce tableau affiche vos tests locaux ET les données du Google Sheet. Si le Google Sheet ne répond pas, seuls vos tests locaux s'affichent.</p>
             </div>
        </div>

        {error && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-orange-800 text-sm">
                {error}
            </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium uppercase">Total Leads</h3>
            <p className="text-4xl font-bold text-brand-blue mt-2">{leads.length}</p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm uppercase">
                  <th className="p-4 font-bold">Date</th>
                  <th className="p-4 font-bold">Nom</th>
                  <th className="p-4 font-bold">Email</th>
                  <th className="p-4 font-bold">Téléphone</th>
                  <th className="p-4 font-bold">Société</th>
                  <th className="p-4 font-bold text-center">Source</th>
                  <th className="p-4 font-bold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {isLoading ? (
                    <tr><td colSpan={7} className="p-8 text-center">Chargement des données...</td></tr>
                ) : leads.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-gray-500 italic">
                      Aucune donnée trouvée.
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-blue-50/30 transition-colors">
                      <td className="p-4 text-gray-500 text-sm whitespace-nowrap">{lead.date}</td>
                      <td className="p-4 font-medium text-brand-deepBlue">{lead.name}</td>
                      <td className="p-4 text-gray-600">{lead.email}</td>
                      <td className="p-4 text-gray-600">{lead.phone}</td>
                      <td className="p-4 text-gray-600">{lead.company}</td>
                      <td className="p-4 text-center">
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${lead.source === 'online' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                              {lead.source === 'online' ? 'Sheet' : 'Local'}
                          </span>
                      </td>
                      <td className="p-4 text-center">
                          {lead.source === 'local' && (
                              <button 
                                onClick={() => handleDeleteLocal(lead.id)}
                                className={`p-2 rounded-lg transition-colors ${
                                    deleteConfirmId === lead.id 
                                    ? 'bg-red-600 text-white hover:bg-red-700' 
                                    : 'text-red-500 hover:bg-red-50'
                                }`}
                                title={deleteConfirmId === lead.id ? "Confirmer la suppression ?" : "Supprimer"}
                              >
                                {deleteConfirmId === lead.id ? "Confirmer ?" : <Trash2 size={18} />}
                              </button>
                          )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
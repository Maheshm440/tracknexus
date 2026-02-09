// Utility functions for data persistence across localStorage

export interface StorageData {
  tracknexus_leads?: any[];
  tracknexus_users?: any[];
  visitor_tracking?: any[];
  tracknexus_activities?: any[];
}

/**
 * Export all data from localStorage to a JSON file
 */
export function exportData(): void {
  const data: StorageData = {
    tracknexus_leads: JSON.parse(localStorage.getItem('tracknexus_leads') || '[]'),
    tracknexus_users: JSON.parse(localStorage.getItem('tracknexus_users') || '[]'),
    visitor_tracking: JSON.parse(localStorage.getItem('visitor_tracking') || '[]'),
    tracknexus_activities: JSON.parse(localStorage.getItem('tracknexus_activities') || '[]'),
  };

  const dataStr = JSON.stringify(data, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `tracknexus-backup-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Import data from a JSON file to localStorage
 */
export function importData(file: File): Promise<void> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string) as StorageData;

        if (data.tracknexus_leads) {
          localStorage.setItem('tracknexus_leads', JSON.stringify(data.tracknexus_leads));
        }
        if (data.tracknexus_users) {
          localStorage.setItem('tracknexus_users', JSON.stringify(data.tracknexus_users));
        }
        if (data.visitor_tracking) {
          localStorage.setItem('visitor_tracking', JSON.stringify(data.visitor_tracking));
        }
        if (data.tracknexus_activities) {
          localStorage.setItem('tracknexus_activities', JSON.stringify(data.tracknexus_activities));
        }

        resolve();
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
}

/**
 * Seed initial demo data if localStorage is empty
 */
export function seedDemoData(): void {
  const leads = JSON.parse(localStorage.getItem('tracknexus_leads') || '[]');

  // Only seed if no data exists
  if (leads.length === 0) {
    const demoLeads = [
      {
        id: 'demo_1',
        name: 'John Doe',
        companyName: 'Tech Corp',
        companyEmail: 'john@techcorp.com',
        companySize: '50-100',
        mobileNumber: '+1234567890',
        message: 'Interested in the enterprise plan',
        formType: 'demo',
        score: 75,
        status: 'NEW',
        createdAt: new Date().toISOString(),
        source: '/pricing',
      },
      {
        id: 'demo_2',
        name: 'Jane Smith',
        companyName: 'StartupXYZ',
        companyEmail: 'jane@startupxyz.com',
        companySize: '10-50',
        mobileNumber: '+1987654321',
        message: 'Want to try the free trial',
        formType: 'free-trial',
        score: 60,
        status: 'NEW',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        source: '/',
      },
    ];

    localStorage.setItem('tracknexus_leads', JSON.stringify(demoLeads));
  }
}

/**
 * Clear all data from localStorage
 */
export function clearAllData(): void {
  localStorage.removeItem('tracknexus_leads');
  localStorage.removeItem('tracknexus_users');
  localStorage.removeItem('visitor_tracking');
  localStorage.removeItem('tracknexus_activities');
}

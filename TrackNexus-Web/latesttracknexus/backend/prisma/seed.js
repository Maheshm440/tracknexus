const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@tracknexus.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@tracknexus.com',
      password: hashedPassword,
      role: 'ADMIN',
      company: 'TrackNexus',
      phone: '+1234567890',
    },
  });

  console.log('✅ Created admin user:', admin.email);

  // Create sample leads
  const leads = [
    {
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '+1234567890',
      company: 'Tech Corp',
      source: 'WEBSITE',
      status: 'NEW',
      priority: 'HIGH',
      value: 50000,
      tags: 'enterprise,technology',
    },
    {
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      phone: '+0987654321',
      company: 'Marketing Pro',
      source: 'REFERRAL',
      status: 'CONTACTED',
      priority: 'MEDIUM',
      value: 25000,
      tags: 'marketing,small-business',
    },
    {
      name: 'Mike Davis',
      email: 'mike.d@example.com',
      phone: '+1122334455',
      company: 'Startup Inc',
      source: 'SOCIAL',
      status: 'QUALIFIED',
      priority: 'HIGH',
      value: 75000,
      tags: 'startup,innovation',
    },
  ];

  for (const leadData of leads) {
    const lead = await prisma.lead.create({
      data: {
        ...leadData,
        assignedTo: admin.id,
      },
    });
    console.log('✅ Created lead:', lead.name);
  }

  // Create sample activities
  const activities = [
    {
      type: 'LOGIN',
      description: 'Admin logged into the system',
    },
    {
      type: 'LEAD_CREATED',
      description: 'Created new lead: John Smith',
    },
    {
      type: 'DASHBOARD_VIEW',
      description: 'Viewed analytics dashboard',
    },
  ];

  for (const activityData of activities) {
    const activity = await prisma.activity.create({
      data: {
        ...activityData,
        user: admin.id,
      },
    });
    console.log('✅ Created activity:', activity.type);
  }

  console.log('🎉 Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

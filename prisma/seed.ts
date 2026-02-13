import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed team members
  const teamMembers = [
    { name: 'Aravind Gajjela', email: 'aravind.gajjela@appitsoftware.com', role: 'MEMBER' as const, department: 'Engineering' },
    { name: 'Asif MD', email: 'asif.md@appitsoftware.com', role: 'MEMBER' as const, department: 'Engineering' },
    { name: 'Babu Kanaka', email: 'babu.kanaka@appitsoft.net', role: 'MEMBER' as const, department: 'Engineering' },
    { name: 'Harsha Devarapally', email: 'harsha.devarapally@appitsoftware.com', role: 'MEMBER' as const, department: 'Engineering' },
    { name: 'Hema Sree', email: 'hema.sree@appsol.cloud', role: 'MEMBER' as const, department: 'Support' },
    { name: 'Kavitha V', email: 'kavitha.vellooru@appitsoft.net', role: 'MEMBER' as const, department: 'Support' },
    { name: 'Kesavula Reddy', email: 'kesavula.reddy@workisy.com', role: 'MEMBER' as const, department: 'Engineering' },
    { name: 'Mahesh Mangala', email: 'mahesh.mangala@workisy.com', role: 'MEMBER' as const, department: 'Engineering' },
    { name: 'Mamatha', email: 'mamatha.bari@appsol.cloud', role: 'MEMBER' as const, department: 'Support' },
    { name: 'Mounitha Angali', email: 'mounitha.angali@appitsoft.cloud', role: 'MEMBER' as const, department: 'Engineering' },
    { name: 'Nagendra K', email: 'nagendra.kumpatla@appsol.cloud', role: 'MEMBER' as const, department: 'Engineering' },
    { name: 'Naveen Sabavath', email: 'naveen.s@zenerp.cloud', role: 'MEMBER' as const, department: 'Engineering' },
    { name: 'Prashanth Bodala', email: 'prashanth@workisy.com', role: 'MANAGER' as const, department: 'Engineering' },
    { name: 'Raghu Gadamsetty', email: 'raghu.gadamsetty@appitsoft.com', role: 'MEMBER' as const, department: 'Engineering' },
    { name: 'Sai Vamshi', email: 'sai.vamshi@appit.tech', role: 'MEMBER' as const, department: 'Engineering' },
  ];

  for (const member of teamMembers) {
    await prisma.teamMember.upsert({
      where: { email: member.email },
      update: { name: member.name, role: member.role, department: member.department },
      create: member,
    });
  }

  console.log(`Seeded ${teamMembers.length} team members.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

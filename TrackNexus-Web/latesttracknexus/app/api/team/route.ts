import { NextRequest, NextResponse } from 'next/server';

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET - List team members with pagination and filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const role = searchParams.get('role');
    const department = searchParams.get('department');
    const search = searchParams.get('search');

    // Build where clause
    const where: Record<string, unknown> = {};

    if (role && role !== 'all') {
      where.role = role;
    }

    if (department && department !== 'all') {
      where.department = department;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    let total = 0;
    let members: any[] = [];
    let activeCount = 0;
    let managerCount = 0;
    let departmentCount = 0;

    try {
      // Get total count
      total = await prisma.teamMember.count({ where });

      // Get team members with pagination
      members = await prisma.teamMember.findMany({
        where,
        orderBy: { joinedAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      });

      // Calculate stats
      activeCount = await prisma.teamMember.count({ where: { status: 'ACTIVE' } });
      managerCount = await prisma.teamMember.count({ where: { role: 'MANAGER' } });

      const departments = await prisma.teamMember.groupBy({
        by: ['department'],
      });
      departmentCount = departments.filter((d: { department: string | null }) => d.department).length;
    } catch (dbError) {
      // Database is unavailable, return empty data
      total = 0;
      members = [];
      activeCount = 0;
      managerCount = 0;
      departmentCount = 0;
    }

    // Calculate average performance from members
    const avgPerformance = members.length > 0
      ? Math.round(members.reduce((sum: number, m: any) => sum + (m.performanceScore || 0), 0) / members.length)
      : 0;

    return NextResponse.json({
      success: true,
      data: members,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      stats: {
        totalMembers: total,
        activeMembers: activeCount,
        managers: managerCount,
        avgPerformance: avgPerformance || 0,
        departments: departmentCount,
      },
    });
  } catch (error) {
    console.error('List team members error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch team members. Please try again.' },
      { status: 500 }
    );
  }
}

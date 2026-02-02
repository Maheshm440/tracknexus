'use client';

import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import { ChevronDown, TrendingUp, Target, Users, DollarSign, ArrowRight, Search, Zap, BarChart3, PieChart } from 'lucide-react';
import Link from 'next/link';

type IconType = 'trending' | 'users' | 'target' | 'zap' | 'barchart' | 'piechart';

interface CampaignTemplate {
  id: string;
  name: string;
  description: string;
  channel: string;
  category: string;
  expectedROI: number;
  estimatedBudget: number;
  duration: string;
  iconType: IconType;
  metrics: {
    avgConversion: number;
    avgCTR: number;
    avgCPC: number;
  };
  color: string;
  featured?: boolean;
}

const getIcon = (iconType: IconType) => {
  switch (iconType) {
    case 'trending':
      return TrendingUp;
    case 'users':
      return Users;
    case 'target':
      return Target;
    case 'zap':
      return Zap;
    case 'barchart':
      return BarChart3;
    case 'piechart':
      return PieChart;
    default:
      return TrendingUp;
  }
};

const campaignTemplates: CampaignTemplate[] = [
  {
    id: 'google-ads-search',
    name: 'Google Ads - Search Campaigns',
    description: 'High-intent keyword targeting for immediate conversions',
    channel: 'Google Ads',
    category: 'Paid Search',
    expectedROI: 350,
    estimatedBudget: 2500,
    duration: '30 days',
    iconType: 'trending',
    metrics: { avgConversion: 4.2, avgCTR: 3.8, avgCPC: 1.25 },
    color: 'from-blue-500 to-blue-600',
    featured: true,
  },
  {
    id: 'facebook-conversion',
    name: 'Facebook Conversion Campaigns',
    description: 'Audience retargeting and lookalike campaigns',
    channel: 'Facebook',
    category: 'Social Media',
    expectedROI: 280,
    estimatedBudget: 1500,
    duration: '30 days',
    iconType: 'users',
    metrics: { avgConversion: 2.8, avgCTR: 1.5, avgCPC: 0.85 },
    color: 'from-indigo-500 to-indigo-600',
  },
  {
    id: 'linkedin-b2b',
    name: 'LinkedIn B2B Lead Generation',
    description: 'Professional targeting for enterprise solutions',
    channel: 'LinkedIn',
    category: 'B2B',
    expectedROI: 420,
    estimatedBudget: 3500,
    duration: '45 days',
    iconType: 'target',
    metrics: { avgConversion: 3.5, avgCTR: 2.1, avgCPC: 2.50 },
    color: 'from-cyan-500 to-blue-600',
    featured: true,
  },
  {
    id: 'email-nurture',
    name: 'Email Nurture Sequences',
    description: 'Automated campaigns for lead nurturing and retention',
    channel: 'Email',
    category: 'Automation',
    expectedROI: 580,
    estimatedBudget: 500,
    duration: '60 days',
    iconType: 'zap',
    metrics: { avgConversion: 8.5, avgCTR: 12.3, avgCPC: 0.05 },
    color: 'from-green-500 to-emerald-600',
  },
  {
    id: 'instagram-engagement',
    name: 'Instagram Brand Awareness',
    description: 'Visual storytelling and audience engagement campaigns',
    channel: 'Instagram',
    category: 'Social Media',
    expectedROI: 220,
    estimatedBudget: 1200,
    duration: '30 days',
    iconType: 'barchart',
    metrics: { avgConversion: 1.8, avgCTR: 2.3, avgCPC: 0.95 },
    color: 'from-pink-500 to-rose-600',
  },
  {
    id: 'display-network',
    name: 'Google Display Network',
    description: 'Broad reach display advertising and brand building',
    channel: 'Display',
    category: 'Display',
    expectedROI: 180,
    estimatedBudget: 2000,
    duration: '30 days',
    iconType: 'piechart',
    metrics: { avgConversion: 1.2, avgCTR: 0.8, avgCPC: 0.35 },
    color: 'from-yellow-500 to-orange-600',
  },
];

const channels = ['All Channels', 'Google Ads', 'Facebook', 'LinkedIn', 'Email', 'Instagram', 'Display'];
const categories = ['All Categories', 'Paid Search', 'Social Media', 'B2B', 'Automation', 'Display'];

export default function MarketingPage() {
  const [selectedChannel, setSelectedChannel] = useState('All Channels');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [openChannelDropdown, setOpenChannelDropdown] = useState(false);
  const [openCategoryDropdown, setOpenCategoryDropdown] = useState(false);

  const filteredCampaigns = useMemo(() => {
    return campaignTemplates.filter((campaign) => {
      const matchesChannel = selectedChannel === 'All Channels' || campaign.channel === selectedChannel;
      const matchesCategory = selectedCategory === 'All Categories' || campaign.category === selectedCategory;
      const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        campaign.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesChannel && matchesCategory && matchesSearch;
    });
  }, [selectedChannel, selectedCategory, searchQuery]);

  const stats = [
    { label: 'Total Campaigns', value: '28', icon: <Target className="w-6 h-6" />, color: 'from-blue-500 to-blue-600' },
    { label: 'Active Campaigns', value: '12', icon: <TrendingUp className="w-6 h-6" />, color: 'from-cyan-500 to-cyan-600' },
    { label: 'Avg ROI', value: '342%', icon: <DollarSign className="w-6 h-6" />, color: 'from-green-500 to-emerald-600' },
    { label: 'Total Conversions', value: '1,284', icon: <Users className="w-6 h-6" />, color: 'from-purple-500 to-pink-600' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-deloitte-green rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
        </div>

        <div className="relative max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="p-2 bg-deloitte-green/20 rounded-lg">
                <Zap className="w-5 h-5 text-deloitte-green" />
              </div>
              <span className="text-deloitte-green font-semibold text-sm">Marketing Tools</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Powerful Marketing<br />Campaign Templates
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Launch data-driven marketing campaigns with pre-built templates optimized for conversions. Track every metric and maximize your ROI.
            </p>
            <Link href="/dashboard/marketing">
              <button className="inline-flex items-center gap-2 px-8 py-3 bg-deloitte-green hover:bg-deloitte-green-dark text-white font-semibold rounded-lg transition-all duration-300 hover:gap-3">
                View Dashboard
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-deloitte-green to-cyan-500 rounded-xl opacity-0 group-hover:opacity-100 blur-lg transition-all duration-500" />
                <div className="relative bg-white rounded-xl p-6 border border-gray-100 group-hover:border-deloitte-green/30 transition-all duration-300 shadow-sm hover:shadow-lg">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-4`}>
                    {stat.icon}
                  </div>
                  <p className="text-gray-600 text-sm font-medium mb-2">{stat.label}</p>
                  <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Campaigns Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Campaign Templates</h2>
            <p className="text-lg text-gray-600">
              Explore our collection of proven marketing campaign templates and strategies
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search campaigns..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-deloitte-green focus:border-transparent transition-all"
                />
              </div>

              {/* Dropdowns */}
              <div className="flex gap-3 flex-wrap sm:flex-nowrap">
                {/* Channel Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setOpenChannelDropdown(!openChannelDropdown)}
                    className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-lg hover:border-deloitte-green hover:shadow-md transition-all"
                  >
                    <span className="text-sm font-medium text-gray-700">{selectedChannel}</span>
                    <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${openChannelDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  {openChannelDropdown && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                      {channels.map((channel) => (
                        <button
                          key={channel}
                          onClick={() => {
                            setSelectedChannel(channel);
                            setOpenChannelDropdown(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                            selectedChannel === channel
                              ? 'bg-deloitte-green/10 text-deloitte-green font-medium'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {channel}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Category Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setOpenCategoryDropdown(!openCategoryDropdown)}
                    className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-lg hover:border-deloitte-green hover:shadow-md transition-all"
                  >
                    <span className="text-sm font-medium text-gray-700">{selectedCategory}</span>
                    <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${openCategoryDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  {openCategoryDropdown && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => {
                            setSelectedCategory(category);
                            setOpenCategoryDropdown(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                            selectedCategory === category
                              ? 'bg-deloitte-green/10 text-deloitte-green font-medium'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Results count */}
            <p className="text-sm text-gray-600 mt-4">
              Showing <span className="font-semibold text-gray-900">{filteredCampaigns.length}</span> of <span className="font-semibold text-gray-900">{campaignTemplates.length}</span> campaigns
            </p>
          </motion.div>

          {/* Campaign Grid */}
          {filteredCampaigns.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredCampaigns.map((campaign, index) => (
                <motion.div
                  key={campaign.id}
                  variants={itemVariants}
                  className="group relative cursor-pointer h-full"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Glow Effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-deloitte-green to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-lg transition-all duration-500" />

                  {/* Card */}
                  <div className="relative bg-white rounded-2xl p-6 border border-gray-100 group-hover:border-deloitte-green/40 shadow-sm group-hover:shadow-xl transition-all duration-300 flex flex-col h-full overflow-hidden">
                    {/* Featured Badge */}
                    {campaign.featured && (
                      <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 bg-deloitte-green/10 border border-deloitte-green/30 text-deloitte-green rounded-full text-xs font-bold">
                        <Zap className="w-3 h-3 fill-current" />
                        Popular
                      </div>
                    )}

                    {/* Header */}
                    <div className="flex items-start justify-between mb-4 pt-2">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${campaign.color} flex items-center justify-center text-white shadow-lg group-hover:shadow-xl group-hover:shadow-deloitte-green/50 transition-all duration-300`}>
                        {(() => {
                          const IconComponent = getIcon(campaign.iconType);
                          return <IconComponent className="w-5 h-5" />;
                        })()}
                      </div>
                      <span className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-lg">
                        {campaign.channel}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-deloitte-green transition-colors duration-300">
                      {campaign.name}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-2">
                      {campaign.description}
                    </p>

                    {/* Category Tag */}
                    <div className="flex gap-2 mb-4">
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-lg">
                        {campaign.category}
                      </span>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-3 gap-3 mb-4 pt-4 border-t border-gray-100">
                      <div className="text-center">
                        <p className="text-xs text-gray-600 mb-1">Conversion Rate</p>
                        <p className="text-sm font-bold text-gray-900">{campaign.metrics.avgConversion}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-600 mb-1">Avg CTR</p>
                        <p className="text-sm font-bold text-gray-900">{campaign.metrics.avgCTR}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-600 mb-1">Avg CPC</p>
                        <p className="text-sm font-bold text-gray-900">${campaign.metrics.avgCPC}</p>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3 mb-4 pt-4 border-t border-gray-100">
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Expected ROI</p>
                        <p className="text-lg font-bold text-green-600">{campaign.expectedROI}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Est. Budget</p>
                        <p className="text-lg font-bold text-gray-900">${campaign.estimatedBudget.toLocaleString()}</p>
                      </div>
                    </div>

                    {/* Duration */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <p className="text-sm text-gray-600">
                        Duration: <span className="font-semibold text-gray-900">{campaign.duration}</span>
                      </p>
                      <motion.div
                        whileHover={{ x: 6 }}
                        className="text-deloitte-green group-hover:text-deloitte-green-dark transition-colors"
                      >
                        <ArrowRight className="w-5 h-5" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-600 text-lg">No campaigns match your filters. Try adjusting your selection.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-deloitte-green via-cyan-500 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Launch Your Next Campaign?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Get started with our campaign templates and start tracking results instantly. Join thousands of marketers already using TrackNexus.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <button className="px-8 py-3 bg-white hover:bg-gray-50 text-deloitte-green font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl">
                  Start Free Trial
                </button>
              </Link>
              <Link href="/contact">
                <button className="px-8 py-3 bg-transparent border-2 border-white hover:bg-white/10 text-white font-semibold rounded-lg transition-all duration-300">
                  Contact Sales
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

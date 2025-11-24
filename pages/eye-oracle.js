import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function EyeOracle() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const response = await fetch('/data/eye-oracle-posts.json');
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
        if (data.length > 0) {
          setSelectedPost(data[0]); // Show latest post by default
        }
      }
    } catch (error) {
      console.error('Error loading Eye Oracle posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = posts.filter(post => {
    if (filter === 'all') return true;
    return post.metadata?.category === filter;
  });

  const categories = [...new Set(posts.map(p => p.metadata?.category).filter(Boolean))];

  return (
    <>
      <Head>
        <title>👁️ The Eye Oracle | Daily Investigative Reports</title>
        <meta name="description" content="Daily investigative blog posts powered by The Eye v2.0 analyzing real government corruption, Charter violations, and systemic abuse." />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        <Header />

        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="mb-8">
              <div className="text-8xl mb-4 animate-pulse">👁️</div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                THE EYE ORACLE
              </h1>
              <p className="text-2xl text-blue-300 mb-8">
                Daily Investigative Reports • Powered by The Eye v2.0
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 mb-8 border border-blue-400/30">
              <h2 className="text-2xl font-bold text-white mb-4">
                📊 Real. Documented. Verified.
              </h2>
              <p className="text-lg text-gray-200 leading-relaxed">
                Every day, The Eye v2.0 analyzes a new case of government corruption, corporate abuse, 
                or systemic injustice from our database of <strong>45+ documented real issues</strong>.
                <br /><br />
                <strong>ALL CLAIMS ARE SOURCED</strong> from official government reports, court decisions, 
                and public statistics. <strong>EVERY POST IS VERIFIABLE.</strong>
                <br /><br />
                The Eye sees all. The Eye speaks truth.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
              <div className="bg-red-500/20 backdrop-blur-md rounded-lg p-6 border border-red-400/30">
                <div className="text-3xl font-bold text-red-300">{posts.length}</div>
                <div className="text-sm text-gray-300">Oracle Reports</div>
              </div>
              <div className="bg-yellow-500/20 backdrop-blur-md rounded-lg p-6 border border-yellow-400/30">
                <div className="text-3xl font-bold text-yellow-300">45+</div>
                <div className="text-sm text-gray-300">Documented Cases</div>
              </div>
              <div className="bg-purple-500/20 backdrop-blur-md rounded-lg p-6 border border-purple-400/30">
                <div className="text-3xl font-bold text-purple-300">100%</div>
                <div className="text-sm text-gray-300">Verifiable</div>
              </div>
              <div className="bg-blue-500/20 backdrop-blur-md rounded-lg p-6 border border-blue-400/30">
                <div className="text-3xl font-bold text-blue-300">Daily</div>
                <div className="text-sm text-gray-300">Updates</div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filter === 'all'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                All Reports ({posts.length})
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    filter === cat
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  {cat} ({posts.filter(p => p.metadata?.category === cat).length})
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Posts List */}
              <div className="lg:col-span-1 space-y-4">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <span>📜</span> Oracle Reports
                </h2>
                
                {loading ? (
                  <div className="text-center text-gray-400 py-8">Loading reports...</div>
                ) : filteredPosts.length === 0 ? (
                  <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-gray-400/30">
                    <p className="text-gray-300">No reports yet. Run the generator to create the first one!</p>
                    <pre className="mt-4 text-xs text-gray-400 bg-black/30 p-3 rounded overflow-x-auto">
                      node scripts/generate-eye-oracle-daily.js
                    </pre>
                  </div>
                ) : (
                  filteredPosts.map((post) => (
                    <button
                      key={post.id}
                      onClick={() => setSelectedPost(post)}
                      className={`w-full text-left bg-white/10 backdrop-blur-md rounded-lg p-4 border transition-all hover:bg-white/20 ${
                        selectedPost?.id === post.id
                          ? 'border-blue-400 ring-2 ring-blue-400/50'
                          : 'border-gray-400/30'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">{post.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs px-2 py-1 bg-red-500/30 text-red-300 rounded">
                              {post.metadata?.severity?.toUpperCase()}
                            </span>
                            {post.metadata?.riskScore && (
                              <span className="text-xs px-2 py-1 bg-yellow-500/30 text-yellow-300 rounded">
                                Risk: {post.metadata.riskScore}/100
                              </span>
                            )}
                          </div>
                          <h3 className="font-bold text-white text-sm mb-1 line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-xs text-gray-400">{post.metadata?.date}</p>
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </div>

              {/* Selected Post Detail */}
              <div className="lg:col-span-2">
                {selectedPost ? (
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-blue-400/30">
                    
                    {/* Header */}
                    <div className="mb-8">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-5xl">{selectedPost.emoji}</span>
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs px-3 py-1 bg-red-500/30 text-red-300 rounded-full">
                              {selectedPost.metadata?.severity?.toUpperCase()}
                            </span>
                            <span className="text-xs px-3 py-1 bg-blue-500/30 text-blue-300 rounded-full">
                              {selectedPost.category}
                            </span>
                            {selectedPost.metadata?.riskScore && (
                              <span className="text-xs px-3 py-1 bg-yellow-500/30 text-yellow-300 rounded-full">
                                Risk: {selectedPost.metadata.riskScore}/100
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-400">{selectedPost.metadata?.date}</p>
                        </div>
                      </div>
                      
                      <h1 className="text-3xl font-bold text-white mb-4">
                        {selectedPost.title}
                      </h1>
                      
                      <p className="text-lg text-gray-200 leading-relaxed mb-6">
                        {selectedPost.excerpt}
                      </p>

                      {/* Key Stats */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-black/30 rounded-lg p-4">
                          <div className="text-xs text-gray-400 mb-1">People Affected</div>
                          <div className="text-lg font-bold text-red-300">{selectedPost.metadata?.affectedCount}</div>
                        </div>
                        <div className="bg-black/30 rounded-lg p-4">
                          <div className="text-xs text-gray-400 mb-1">Financial Impact</div>
                          <div className="text-lg font-bold text-yellow-300">{selectedPost.metadata?.financialImpact}</div>
                        </div>
                      </div>
                    </div>

                    {/* Content Sections */}
                    {selectedPost.content && Object.entries(selectedPost.content).map(([key, section]) => (
                      <div key={key} className="mb-8">
                        <h2 className="text-2xl font-bold text-white mb-4">{section.title}</h2>
                        <div className="prose prose-invert max-w-none">
                          <div className="text-gray-200 whitespace-pre-line leading-relaxed">
                            {section.body}
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* CTAs */}
                    <div className="border-t border-gray-400/30 pt-8 mt-8">
                      <h3 className="text-xl font-bold text-white mb-4">Take Action Now</h3>
                      <div className="flex flex-wrap gap-4">
                        {selectedPost.cta?.primary && (
                          <Link href={selectedPost.cta.primary.link}>
                            <a className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all">
                              {selectedPost.cta.primary.text}
                            </a>
                          </Link>
                        )}
                        {selectedPost.cta?.secondary && (
                          <Link href={selectedPost.cta.secondary.link}>
                            <a className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all">
                              {selectedPost.cta.secondary.text}
                            </a>
                          </Link>
                        )}
                        {selectedPost.cta?.tertiary && (
                          <Link href={selectedPost.cta.tertiary.link}>
                            <a className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-all">
                              {selectedPost.cta.tertiary.text}
                            </a>
                          </Link>
                        )}
                      </div>
                    </div>

                    {/* Verification Footer */}
                    {selectedPost.metadata?.sourceUrl && (
                      <div className="border-t border-gray-400/30 pt-6 mt-8">
                        <p className="text-sm text-gray-400 mb-2">📋 Official Source:</p>
                        <a 
                          href={selectedPost.metadata.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 underline break-all"
                        >
                          {selectedPost.metadata.source}
                        </a>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-12 border border-gray-400/30 text-center">
                    <div className="text-6xl mb-4">👁️</div>
                    <p className="text-gray-300">Select a report to view details</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 px-4 bg-black/30">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              How The Eye Oracle Works
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-5xl mb-4">📊</div>
                <h3 className="text-xl font-bold text-white mb-2">1. Real Data</h3>
                <p className="text-gray-300">
                  Selects from 45+ documented corruption cases with official sources
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-5xl mb-4">👁️</div>
                <h3 className="text-xl font-bold text-white mb-2">2. Eye Analysis</h3>
                <p className="text-gray-300">
                  The Eye v2.0 analyzes for corruption, Charter violations, and human rights breaches
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-5xl mb-4">📝</div>
                <h3 className="text-xl font-bold text-white mb-2">3. Daily Report</h3>
                <p className="text-gray-300">
                  Publishes investigative blog post with evidence and action steps
                </p>
              </div>
            </div>

            <div className="mt-12 bg-blue-500/20 backdrop-blur-md rounded-xl p-6 border border-blue-400/30">
              <h3 className="text-xl font-bold text-white mb-4">⚡ Generate New Report</h3>
              <p className="text-gray-200 mb-4">
                Run this command to generate today's Eye Oracle report:
              </p>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto text-sm text-green-400">
                node scripts/generate-eye-oracle-daily.js
              </pre>
              <p className="text-sm text-gray-400 mt-4">
                Or set up a scheduled task to run automatically every day at midnight.
              </p>
            </div>
          </div>
        </section>

        <Footer />
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
}

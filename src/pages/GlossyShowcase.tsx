import { useState } from 'react'
import { Sparkles, RotateCcw, Zap, TrendingUp, Activity, Volume2, Wallet, Shield } from 'lucide-react'
import GlossyCard from '@components/GlossyCard'

export default function GlossyShowcase() {
  const [flipped, setFlipped] = useState<string | null>(null)

  const glossyMetrics = [
    { title: 'Transaction Volume', value: '₦2.48M', icon: <TrendingUp size={32} />, color: 'blue' as const },
    { title: 'Success Rate', value: '99.85%', icon: <Activity size={32} />, color: 'green' as const },
    { title: 'Active Wallets', value: '8', icon: <Wallet size={32} />, color: 'orange' as const },
    { title: 'System Health', value: '96%', icon: <Shield size={32} />, color: 'purple' as const },
  ]

  const features = [
    {
      id: 'glossy-1',
      title: 'Glossy Glass',
      description: 'Premium glassmorphic surface with smooth shine animation',
    },
    {
      id: 'glossy-2',
      title: '3D Perspective',
      description: 'Smooth 3D depth effects with hover transforms',
    },
    {
      id: 'glossy-3',
      title: 'Smooth Animations',
      description: 'Silk-smooth transitions and slide animations',
    },
    {
      id: 'glossy-4',
      title: 'Staggered Effects',
      description: 'Cascading entrance animations with calculated delays',
    },
    {
      id: 'glossy-5',
      title: 'Glow & Ripple',
      description: 'Dynamic glow effects and ripple interactions',
    },
    {
      id: 'glossy-6',
      title: 'Morphing Shapes',
      description: 'Smooth morphing border radius animations',
    },
  ]

  return (
    <div className="pb-8 px-4 md:px-8 max-w-7xl mx-auto w-full page-container">
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="animate-slide-down text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles size={40} className="text-accent-blue" />
            <h1 className="font-apple text-5xl font-bold text-text-primary">Glossy 3D Experience</h1>
            <Sparkles size={40} className="text-accent-blue" />
          </div>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Premium glassmorphic design with smooth 3D effects, interactive animations, and silk-smooth page transitions
          </p>
        </div>

        {/* Glossy Metrics Grid */}
        <div className="space-y-6">
          <h2 className="section-title">Glossy Metric Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {glossyMetrics.map((metric, idx) => (
              <div key={idx} className="stagger-item">
                <GlossyCard
                  title={metric.title}
                  value={metric.value}
                  icon={metric.icon}
                  color={metric.color}
                  gloss={true}
                  animated={true}
                />
              </div>
            ))}
          </div>
        </div>

        {/* 3D Flip Cards */}
        <div className="space-y-6">
          <h2 className="section-title">3D Interactive Flip Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="card-3d-flip stagger-item cursor-pointer"
                onClick={() => setFlipped(flipped === feature.id ? null : feature.id)}
              >
                <div className="card-3d-flip-inner">
                  {/* Front */}
                  <div className="card-3d-flip-front p-6 flex flex-col items-center justify-center">
                    <Zap size={40} className="text-accent-blue mb-4" />
                    <h3 className="text-xl font-bold text-text-primary text-center">{feature.title}</h3>
                    <p className="text-xs text-text-secondary mt-2 text-center">Click to flip</p>
                  </div>

                  {/* Back */}
                  <div className="card-3d-flip-back p-6 flex flex-col items-center justify-center">
                    <p className="text-white font-semibold text-center">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Glossy Surface Examples */}
        <div className="space-y-6">
          <h2 className="section-title">Glossy Surface Effects</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Glossy Card with Shine */}
            <div className="glossy-card stagger-item group">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-accent-blue/20 flex items-center justify-center">
                    <Sparkles size={24} className="text-accent-blue" />
                  </div>
                  <div>
                    <p className="font-semibold text-text-primary">Premium Glass</p>
                    <p className="text-xs text-text-secondary">Glossy shine animation</p>
                  </div>
                </div>
                <p className="text-text-secondary text-sm mb-4">
                  This card has a smooth glossy surface with a continuous shine animation that sweeps across the surface.
                </p>
                <button className="btn text-sm w-full group-hover:scale-105 transition-transform">
                  Experience Glossy
                </button>
              </div>
            </div>

            {/* Glow Effect Card */}
            <div className="apple-surface rounded-2xl p-6 stagger-item glow-effect transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-accent-green/20 flex items-center justify-center">
                  <Activity size={24} className="text-accent-green" />
                </div>
                <div>
                  <p className="font-semibold text-text-primary">Glow Effect</p>
                  <p className="text-xs text-text-secondary">Hover to see glow</p>
                </div>
              </div>
              <p className="text-text-secondary text-sm mb-4">
                Dynamic glow effect that intensifies on hover. Perfect for highlighting important metrics and CTAs.
              </p>
              <button className="btn-secondary text-sm w-full hover:bg-white/[0.12] transition-all">
                Enable Glow
              </button>
            </div>
          </div>
        </div>

        {/* Animation Showcase */}
        <div className="space-y-6">
          <h2 className="section-title">Smooth Animations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Floating Animation */}
            <div className="apple-surface rounded-2xl p-8 flex flex-col items-center justify-center min-h-64 stagger-item">
              <div className="floating">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent-blue to-accent-blue/50 flex items-center justify-center mb-6">
                  <Zap size={48} className="text-white" />
                </div>
              </div>
              <p className="text-text-primary font-semibold text-center">Floating Animation</p>
              <p className="text-text-secondary text-sm text-center mt-2">Smooth floating motion with grace</p>
            </div>

            {/* Morphing Shape */}
            <div className="apple-surface rounded-2xl p-8 flex flex-col items-center justify-center min-h-64 stagger-item">
              <div className="morphing-shape w-24 h-24 bg-gradient-to-br from-accent-orange to-accent-orange/50 flex items-center justify-center mb-6">
                <Volume2 size={48} className="text-white" />
              </div>
              <p className="text-text-primary font-semibold text-center">Morphing Shape</p>
              <p className="text-text-secondary text-sm text-center mt-2">Organic border radius transformations</p>
            </div>

            {/* Ripple Effect */}
            <div className="apple-surface rounded-2xl p-8 flex flex-col items-center justify-center min-h-64 stagger-item">
              <button className="w-24 h-24 rounded-full bg-accent-green flex items-center justify-center ripple-effect">
                <Shield size={48} className="text-white" />
              </button>
              <p className="text-text-primary font-semibold text-center mt-6">Ripple Effect</p>
              <p className="text-text-secondary text-sm text-center mt-2">Click ripple expansion animation</p>
            </div>

            {/* Staggered List */}
            <div className="apple-surface rounded-2xl p-6">
              <p className="text-text-primary font-semibold mb-4">Staggered Entrance</p>
              <div className="space-y-3">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="stagger-item h-12 bg-apple-gray5 rounded-lg px-4 flex items-center">
                    <span className="text-text-secondary">Item {item} - Cascading animation</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Page Transition Info */}
        <div className="glossy-card text-center">
          <div className="relative z-10">
            <h3 className="section-title mb-4 justify-center">Smooth Page Transitions</h3>
            <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
              This entire page slides in with smooth 3D perspective transforms. Each section staggered for a cascading effect. All transitions use cubic-bezier timing for natural motion.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button className="btn flex items-center gap-2">
                <RotateCcw size={16} /> Reload Page
              </button>
              <button className="btn-secondary">Scroll to see animations</button>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="space-y-6">
          <h2 className="section-title">All Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              '✨ Glossy Glass Surface',
              '🎯 3D Perspective Depth',
              '🌊 Smooth Page Slides',
              '⏱️ Staggered Animations',
              '💫 Glow & Ripple Effects',
              '🎭 Morphing Shapes',
              '🎪 Floating Elements',
              '✨ Shine Animations',
              '🔄 Page Transitions',
              '🎨 Gradient Effects',
              '👆 Interactive Hovers',
              '📱 Mobile Optimized',
            ].map((feature, idx) => (
              <div key={idx} className="glossy-card stagger-item text-center py-4">
                <p className="text-text-primary font-semibold">{feature}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="glossy-card text-center glow-effect">
          <div className="relative z-10">
            <h3 className="text-3xl font-bold text-text-primary mb-4">Ready to Experience Glossy?</h3>
            <p className="text-text-secondary mb-6 max-w-xl mx-auto">
              All pages in this application now feature glossy surfaces, smooth 3D effects, and premium animations.
            </p>
            <button className="btn">Explore All Features</button>
          </div>
        </div>
      </div>
    </div>
  )
}

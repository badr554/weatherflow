import { GlassCard } from '@/components/common/GlassCard';
import { Skeleton } from '@/components/common/Skeleton';

export function DashboardSkeleton() {
  return (
    <div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.3fr 1fr',
          gap: 24,
          marginBottom: 24,
        }}
        className="hero-grid"
      >
        <GlassCard padding={40}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Skeleton width={160} height={30} />
              <Skeleton width={200} height={15} />
            </div>
            <Skeleton width={88} height={88} borderRadius={44} />
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 18, marginTop: 24 }}>
            <Skeleton width={160} height={80} borderRadius={12} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingBottom: 14 }}>
              <Skeleton width={140} height={20} />
              <Skeleton width={200} height={14} />
            </div>
          </div>
        </GlassCard>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <GlassCard padding="26px 28px" style={{ flex: 1 }}>
            <Skeleton width={110} height={14} style={{ marginBottom: 14 }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <Skeleton width={76} height={76} borderRadius={38} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <Skeleton width={90} height={16} />
                <Skeleton width={180} height={13} />
              </div>
            </div>
          </GlassCard>
          <GlassCard padding="26px 28px" style={{ flex: 1 }}>
            <Skeleton width={140} height={14} style={{ marginBottom: 16 }} />
            <Skeleton width="100%" height={6} borderRadius={999} style={{ margin: '18px 4px' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Skeleton width={90} height={13} />
              <Skeleton width={90} height={13} />
            </div>
          </GlassCard>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
          gap: 18,
          marginBottom: 24,
        }}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <GlassCard key={i} padding={22} radius={22}>
            <Skeleton width={36} height={36} borderRadius={11} style={{ marginBottom: 14 }} />
            <Skeleton width={80} height={13} style={{ marginBottom: 8 }} />
            <Skeleton width={60} height={26} style={{ marginBottom: 6 }} />
            <Skeleton width={100} height={12} />
          </GlassCard>
        ))}
      </div>

      <GlassCard style={{ marginBottom: 24 }}>
        <Skeleton width={140} height={14} style={{ marginBottom: 18 }} />
        <div style={{ display: 'flex', gap: 14, overflowX: 'hidden' }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} width={92} height={120} borderRadius={18} />
          ))}
        </div>
      </GlassCard>

      <GlassCard style={{ marginBottom: 40 }}>
        <Skeleton width={130} height={14} style={{ marginBottom: 16 }} />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} style={{ padding: '16px 6px' }}>
            <Skeleton width="100%" height={24} />
          </div>
        ))}
      </GlassCard>
    </div>
  );
}

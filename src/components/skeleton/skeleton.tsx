import styles from './skeleton.module.css';

export const Skeleton = () => {
  return <div className={styles.skeleton} />;
};

export const SkeletonLine = (props: { width?: string }) => (
  <div style={{ width: props.width, height: 14 }}>
    <Skeleton />
  </div>
);

export const SkeletonAvatar = () => (
  <div style={{ width: 40, height: 40, borderRadius: '50%' }}>
    <Skeleton />
  </div>
);

export const SkeletonText = ({ lines = 3 }: { lines?: number }) => {
  const widths = ['80%', '95%', '60%', '85%', '70%'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {widths.slice(0, lines).map((width, i) => (
        <div key={i} style={{ width, height: 14 }}>
          <Skeleton />
        </div>
      ))}
    </div>
  );
};

export const SkeletonCard = () => (
  <div
    style={{
      width: 300,
      padding: 16,
      border: '1px solid #eee',
      borderRadius: 8,
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
    }}
  >
    <div style={{ width: '100%', height: 180 }}>
      <Skeleton />
    </div>
    <SkeletonLine width="70%" />
    <SkeletonLine width="90%" />
    <SkeletonLine width="50%" />
  </div>
);

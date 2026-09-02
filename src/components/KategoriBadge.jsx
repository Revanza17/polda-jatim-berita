const styles = {
  Positif: 'bg-positif-bg text-positif-text',
  Netral: 'bg-netral-bg text-netral-text',
  Negatif: 'bg-negatif-bg text-negatif-text',
}

export default function KategoriBadge({ kategori }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full px-3 py-1 text-xs font-semibold ${
        styles[kategori] ?? styles.Netral
      }`}
    >
      {kategori}
    </span>
  )
}

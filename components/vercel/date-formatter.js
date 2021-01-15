export default function DateFormatter({ dateString }) {
  return <time dateTime={dateString}>{dateString}</time>
}

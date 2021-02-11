const UL: React.FC = ({ children }) => <ul className='list-disc'>{children}</ul>

const OL: React.FC = ({ children }) => (
  <ul className='list-decimal'>{children}</ul>
)

export default { UL, OL }

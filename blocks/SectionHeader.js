// const SectionHeaderOld = styled.div`
//   text-align: center;
//   color: ${codepurple};
//   font-family: 'Raleway', sans-serif;
//   font-weight: 300;
//   font-size: 3rem;
//   letter-spacing: 0.5rem;

//   &:after {
//     display: block;
//     content: '';
//     width: 80%;
//     margin: 0 auto 2rem auto;
//     border-bottom: 0.375rem solid ${codepurple};
//   }

//   @media screen and (max-width: 767px) {
//     font-size: 2rem;
//   }
// `

const SectionHeader = ({ children, ...props }) => {
  return (
    <div className='text-center' {...props}>
      {children}
    </div>
  )
}

export { SectionHeader }

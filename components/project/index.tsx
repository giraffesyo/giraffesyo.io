import Slider from 'react-slick'
import styles from './project.module.css'
const slicksettings = {
  dots: true,
  infinite: true,
  arrows: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
}

interface ProjectSliderProps {
  images: string | string[]
  alt: string
}

const ProjectSlider: React.FC<ProjectSliderProps> = ({ alt, images }) => {
  const items = Array.isArray(images) ? (
    images.map((image, index) => (
      <div key={alt + index}>
        <img className='img-fluid' src={image} alt={alt} />
      </div>
    ))
  ) : (
    <img className='img-fluid' src={images} alt={alt} />
  )
  return (
    <Slider appendDots={(dots) => <ul>{dots}</ul>} {...slicksettings}>
      {items}
    </Slider>
  )
}

interface ProjectProps {
  title: string
  images: string | string[]
}

const Project: React.FC<ProjectProps> = ({ title, images, children }) => {
  return (
    <div className={styles.project}>
      <div className='col-12 col-md-4'>
        {images && <ProjectSlider images={images} alt={title} />}
        {!images && <div className='text-center h1'>{title}</div>}
      </div>
      <div className='col-12 col-md-8 mt-4 mt-md-0'>{children}</div>
    </div>
  )
}
export { Project, ProjectSlider }

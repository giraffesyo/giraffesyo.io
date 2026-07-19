import { Link } from 'react-router'
import { ROUTE_METADATA } from '../../site.config.mjs'
import AboutMeSection from '../components/AboutMeSection'
import PostPreview from '../components/blog/PostPreview'
import CertificationsSection from '../components/CertificationsSection'
import EducationSection from '../components/EducationSection'
import FadeIn from '../components/FadeIn'
import HeroSection from '../components/HeroSection'
import Seo from '../components/Seo'
import WorkExperienceSection from '../components/WorkExperienceSection'
import { getPosts } from '../lib/blog'

export default function Home() {
  const posts = getPosts().slice(0, 2)

  return (
    <>
      <Seo pathname='/' {...ROUTE_METADATA['/']} />
      <HeroSection />

      {/* ── About ── */}
      <section id='about' className='px-6 py-24'>
        <div className='max-w-6xl mx-auto'>
          <FadeIn>
            <AboutMeSection />
          </FadeIn>
        </div>
      </section>

      {/* ── Experience ── */}
      <section id='experience' className='px-6 py-24'>
        <div className='max-w-6xl mx-auto'>
          <FadeIn>
            <div className='section-label'>
              <span>01 / Experience</span>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <WorkExperienceSection />
          </FadeIn>
        </div>
      </section>

      {/* ── Education ── */}
      <section id='education' className='px-6 py-24'>
        <div className='max-w-6xl mx-auto'>
          <FadeIn>
            <div className='section-label'>
              <span>02 / Education</span>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <EducationSection />
          </FadeIn>
        </div>
      </section>

      {/* ── Certifications ── */}
      <section className='px-6 py-24'>
        <div className='max-w-6xl mx-auto'>
          <FadeIn>
            <div className='section-label'>
              <span>03 / Certifications</span>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <CertificationsSection />
          </FadeIn>
        </div>
      </section>

      {/* ── Blog preview ── */}
      {posts.length > 0 && (
        <section className='px-6 py-24'>
          <div className='max-w-6xl mx-auto'>
            <FadeIn>
              <div className='section-label'>
                <span>04 / Writing</span>
              </div>
              <div className='flex items-end justify-between mb-8'>
                <h2 className='font-display text-3xl font-bold text-stone-900 dark:text-zinc-50'>
                  Latest posts
                </h2>
                <Link
                  to='/blog'
                  className='text-sm text-accent hover:text-accent-hover transition-colors'
                >
                  View all &rarr;
                </Link>
              </div>
            </FadeIn>
            <div className='grid gap-6'>
              {posts.map(({ frontMatter }, i) => (
                <FadeIn key={frontMatter.slug} delay={0.1 * (i + 1)}>
                  <PostPreview {...frontMatter} />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

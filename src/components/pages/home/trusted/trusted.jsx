import clsx from 'clsx';
import Image from 'next/image';
import PropTypes from 'prop-types';

import Container from 'components/shared/container';
import digitImage from 'images/pages/home/trusted/digit.jpg';
import elephantImage from 'images/pages/home/trusted/elephant.jpg';
import githubImage from 'images/pages/home/trusted/github.jpg';
import socImage from 'images/pages/home/trusted/soc.jpg';

const Card = ({ className, borderClassName, bgImage, children }) => (
  <div
    className={clsx(
      'relative flex items-end rounded-[10px] p-6 xl:rounded-lg xl:p-5 lg:rounded-[10px] sm:p-4',
      className
    )}
  >
    <Image
      className="absolute inset-0 h-full w-full rounded-[inherit] object-cover"
      width={bgImage.width}
      height={bgImage.height}
      src={bgImage}
      alt=""
    />
    <div className={clsx('absolute inset-0 z-10 rounded-[inherit]', borderClassName)} />
    <p
      className={clsx(
        'relative z-20 text-lg leading-snug tracking-extra-tight text-gray-new-50',
        'xl:text-sm xl:leading-tight lg:text-base lg:leading-snug md:text-[15px] md:leading-tight'
      )}
    >
      {children}
    </p>
  </div>
);

Card.propTypes = {
  className: PropTypes.string,
  borderClassName: PropTypes.string,
  bgImage: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

const Trusted = () => (
  <section className="trusted mt-[224px] xl:mt-28 md:mt-20">
    <Container className="xl:px-[80px]" size="1152">
      <h2
        className={clsx(
          '-mb-14 bg-white bg-clip-text text-center text-[152px] font-medium leading-none -tracking-[0.05em] text-transparent',
          'bg-[radial-gradient(34.86%_84.21%_at_71.59%_84.21%,_#000_17.9%,_#FFF_64%)]',
          'xl:-mb-[46px] xl:text-[112px] lg:mb-8 lg:bg-none lg:text-7xl lg:text-white md:text-[40px] md:leading-[0.95em] md:tracking-tighter'
        )}
      >
        Trusted Postgres
      </h2>
      <div
        className={clsx(
          'grid grid-cols-[22.22%_27.86%_25%_auto] items-end justify-center gap-x-8 px-0',
          'xl:gap-6 lg:grid-cols-[1fr_1fr] lg:gap-5 lg:px-8 sm:grid-cols-1 sm:gap-3 sm:px-0'
        )}
      >
        <Card
          className="aspect-[256/198] justify-center lg:order-3 lg:aspect-[310/220] sm:order-5 sm:aspect-[310/220]"
          borderClassName="border-linear border-image-home-trusted-github-card"
          bgImage={githubImage}
        >
          <strong className="mx-auto font-medium text-white">neondatabase/neon</strong>
        </Card>
        <Card
          className="relative z-10 aspect-[321/303] lg:order-1 lg:aspect-[310/220] sm:aspect-[310/220]"
          borderClassName="border-linear border-image-home-trusted-digit-card"
          bgImage={digitImage}
        >
          <strong className="font-medium text-white">Databases under management.</strong>{' '}
          <span className="font-light">Reliable partner for everyone.</span>
        </Card>
        <Card
          className={clsx(
            'aspect-[288/428] lg:order-2 lg:aspect-[310/220] lg:shadow-none sm:aspect-[310/220]',
            'shadow-[0px_-10px_62px_12px_rgba(0,0,0,0.9),30px_10px_60px_0px_rgba(0,0,0,0.8),-50px_10px_60px_0px_rgba(0,0,0,0.9)]'
          )}
          borderClassName="border-gray-new-10 border"
          bgImage={elephantImage}
        >
          <strong className="font-medium text-white">Actually just Postgres.</strong>{' '}
          <span className="font-regular">With the Neon API, you can create account.</span>
        </Card>
        <Card
          className="aspect-[192/247] lg:order-4 lg:aspect-[310/220] lg:justify-center sm:aspect-[320/220]"
          borderClassName="border-linear border-image-home-trusted-soc-card"
          bgImage={socImage}
        >
          <strong className="font-medium text-white">SOC2 Compliance</strong>
        </Card>
      </div>
    </Container>
  </section>
);

export default Trusted;

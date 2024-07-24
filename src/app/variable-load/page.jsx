import Budget from 'components/pages/variable/budget';
import Efficiency from 'components/pages/variable/efficiency';
import Hero from 'components/pages/variable/hero';
import Load from 'components/pages/variable/load';
import RelevantArticles from 'components/pages/variable/relevant-articles';
import Unique from 'components/pages/variable/unique';
import Container from 'components/shared/container';
import Cta from 'components/shared/get-started';
import Layout from 'components/shared/layout';
import TableOfContents from 'components/shared/table-of-contents';
import LINKS from 'constants/links';
import SEO_DATA from 'constants/seo-data';
import evolutionOfPostgres from 'images/pages/variable-load/relevant-articles/evolution-of-postgres.jpg';
import { getWpPostBySlug } from 'utils/api-posts';
import getFormattedDate from 'utils/get-formatted-date';
import getMetadata from 'utils/get-metadata';

export const metadata = getMetadata(SEO_DATA.variable);

const blogArticlesData = [
  {
    slug: '/blog/autoscaling-in-action-postgres-load-testing-with-pgbench',
    order: 2,
  },
  {
    slug: '/blog/1-year-of-autoscaling-postgres-at-neon',
    order: 3,
  },
  {
    slug: '/blog/white-widgets-secret-to-scalable-postgres-neon',
    order: 9,
  },
  {
    slug: '/blog/how-recrowd-uses-neon-autoscaling-to-meet-fluctuating-demand',
    order: 10,
  },
  {
    slug: '/blog/why-you-want-a-database-that-scales-to-zero',
    order: 11,
  },
];

const docsArticlesData = [
  {
    slug: '/docs/introduction/autoscaling',
    title: 'Autoscaling',
    order: 6,
  },
  {
    slug: '/docs/introduction/neon-utils',
    title: 'The neon_utils extension',
    order: 7,
  },
];

const externalArticlesData = [
  {
    url: 'https://www.outerbase.com/blog/the-evolution-of-serverless-postgres/',
    title: 'The Evolution of Serverless Postgres',
    image: evolutionOfPostgres,
    date: 'May 29, 2024',
    order: 1,
  },
  {
    url: 'https://medium.com/@carlotasotos/database-economics-an-amazon-rds-reflection-5d7a35638b20',
    title: 'Database economics: an Amazon RDS reflection',
    date: 'May 31, 2024',
    order: 4,
  },
  {
    url: 'https://dev.to/rsiv/auto-scaling-apps-by-default-neon-api-gateway-nitric-34id',
    title: 'Architectural choices that scale',
    date: 'Jun 6, 2023',
    order: 5,
  },
  {
    url: 'https://github.com/prisma/read-replicas-demo',
    title: 'Read Replicas Demo',
    order: 8,
  },
];

const fetchBlogArticles = async (articles) =>
  Promise.all(
    articles.map(async (article) => {
      const { post } = await getWpPostBySlug(article.slug);
      if (post) {
        return {
          ...article,
          title: post.title,
          date: getFormattedDate(post.date),
          image: post.seo?.twitterImage?.mediaItemUrl,
        };
      }
      return article;
    })
  );

const articlesWithImages = (articles) =>
  articles.map((article) => {
    if (article.image) {
      return article;
    }
    const encodedTitle = Buffer.from(article.title).toString('base64');
    const imagePath = `/docs/og?title=${encodedTitle}&show-logo=${article.url ? 'false' : 'true'}`;
    return {
      ...article,
      image: imagePath,
    };
  });

const tableOfContents = [
  {
    title: 'Variable resources for variable load',
    id: 'variable-resources-for-variable-load',
  },
  {
    title: 'Maximize efficiency and cut costs with Serverless Postgres',
    id: 'maximize-efficiency-and-cut-costs-with-serverless-postgres',
  },
  {
    title: 'How much budget are you wasting on unused compute?',
    id: 'how-much-budget-are-you-wasting-on-unused-compute',
  },
  {
    title: 'What makes Neon unique vs others?',
    id: 'what-makes-neon-unique-vs-others',
  },
];

const VariableLoadPage = async () => {
  const blogArticles = await fetchBlogArticles(blogArticlesData);
  const docsArticles = articlesWithImages(docsArticlesData);
  const externalArticles = articlesWithImages(externalArticlesData);
  const allArticles = [...blogArticles, ...docsArticles, ...externalArticles];

  return (
    <Layout headerWithBorder burgerWithoutBorder isDocPage isHeaderSticky>
      <div className="safe-paddings flex flex-1 flex-col dark:bg-black-pure dark:text-white lg:block">
        <Container
          className="grid w-full flex-1 grid-cols-12 gap-x-10 pb-20 pt-11 xl:gap-x-7 lg:block lg:gap-x-5 lg:pt-4"
          size="1344"
        >
          <div className="col-span-6 col-start-4 -mx-10 flex flex-col 2xl:col-span-9 2xl:col-start-2 2xl:mx-5 xl:col-span-8 xl:col-start-3 lg:ml-0 md:mx-auto md:pb-[70px] sm:pb-8">
            <article>
              <Hero />
              <Load />
              <Efficiency />
              <Budget />
              <Unique />
            </article>
          </div>

          <div className="col-start-10 col-end-13 ml-[50px] h-full xl:ml-0 xl:hidden">
            <nav className="no-scrollbars sticky bottom-10 top-[104px] max-h-[calc(100vh-80px)] overflow-y-auto overflow-x-hidden">
              <TableOfContents items={tableOfContents} />
            </nav>
          </div>
        </Container>

        <RelevantArticles articles={allArticles} />
        <Cta
          title="Try it yourself"
          description="You can experiment with autoscaling for free during 14 days"
          button={{
            title: 'Request a Scale trial',
            url: LINKS.scaleTrial,
          }}
          size="sm"
        />
      </div>
    </Layout>
  );
};

export default VariableLoadPage;

export const revalidate = 60;

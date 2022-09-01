/* eslint-disable react/prop-types */
import { graphql } from 'gatsby';
import React from 'react';

import Aside from 'components/pages/changelog-content/aside';
import Hero from 'components/pages/changelog-content/hero/hero';
import Container from 'components/shared/container';
import Content from 'components/shared/content';
import Heading from 'components/shared/heading';
import Layout from 'components/shared/layout';
import Link from 'components/shared/link';
import SEO from 'components/shared/seo';
import SubscribeMinimalistic from 'components/shared/subscribe-minimalistic';
import { CHANGELOG_BASE_PATH } from 'constants/changelog';
import SEO_DATA from 'constants/seo-data';

const ChangelogPostTemplate = ({
  data: {
    mdx: { slug, body, frontmatter },
  },
}) => (
  <Layout headerTheme="white">
    <Hero />
    <Container size="sm" className="relative mb-10 flex">
      <article className="relative flex sm:flex-col">
        <Aside slug={slug} label={frontmatter.label} />
        <div className="relative before:absolute before:top-3.5 before:bottom-16 before:-left-11 before:h-auto before:w-px before:bg-gray-3 xl:before:hidden">
          <Heading
            className="relative mb-5 !text-2xl leading-normal before:absolute before:top-3.5 before:-left-[49.5px] before:h-3 before:w-3 before:rounded-full before:border before:border-black before:bg-white xl:before:hidden"
            tag="h3"
            size="sm"
            theme="black"
          >
            {frontmatter.title}
          </Heading>
          <Content content={body} />
          <Link
            className="mt-10 font-semibold lg:mt-8"
            to={CHANGELOG_BASE_PATH}
            size="sm"
            theme="black-primary-1"
          >
            back to all changelogs
          </Link>
        </div>
      </article>
    </Container>
    <SubscribeMinimalistic />
  </Layout>
);

export const query = graphql`
  query ($id: String!) {
    mdx(id: { eq: $id }) {
      slug
      body
      frontmatter {
        title
        label
      }
    }
  }
`;

export default ChangelogPostTemplate;

export const Head = ({
  data: {
    mdx: { frontmatter },
  },
  location: { pathname },
}) => (
  <SEO
    pathname={pathname}
    {...SEO_DATA.changelogPost({
      title: frontmatter.title,
    })}
  />
);

import {
  Center,
  Container,
  PaginationPageChangeDetails,
  Spacer,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

import { ArticleCategoryResponseCollection } from "@/apis/articles/articleCategories";
import {
  ArticleResponseCollection,
  fetchArticlesNextJs,
} from "@/apis/articles/articles";

import ArticleListSkeleton from "@/components/Blog/ArticleListSkeleton/ArticleListSkeleton";
import ArticlePagination from "@/components/Blog/ArticlePagination/ArticlePagination";
import ArticlesHero from "@/components/Blog/ArticlesHero/ArticlesHero";
import ArticlesList from "@/components/Blog/ArticlesList/ArticlesList";

type ArticleListingContainerProps = {
  categoriesResponse: ArticleCategoryResponseCollection;
  initialArticlesResponse: ArticleResponseCollection;
  pageSize: number;
  /** Optional category slug for category page */
  categorySlug?: string;
};

type ArticleListingQueryParams = {
  page?: number;
  keyword?: string;
};

export const ArticleListingContainer: React.FC<
  ArticleListingContainerProps
> = ({
  categoriesResponse,
  initialArticlesResponse,
  pageSize,
  categorySlug,
}) => {
  const router = useRouter();

  const [articlesResponse, setArticlesResponse] =
    useState<ArticleResponseCollection>(initialArticlesResponse);
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  // URL is the source of truth
  const page = Number(router.query.page ?? 1);
  const searchKeyword = (router.query.keyword as string) ?? "";

  const buildQuery = (
    page: number,
    keyword: string,
    categorySlug?: string
  ): ArticleListingQueryParams & { slug?: string } => {
    const query: ArticleListingQueryParams & { slug?: string } = {};

    if (page > 1) {
      query.page = page;
    }

    if (keyword.length > 0) {
      query.keyword = keyword;
    }

    if (categorySlug) {
      query.slug = categorySlug; // 👈 critical
    }

    return query;
  };

  const updateRouter = async (page: number, keyword: string) => {
    await router.push(
      {
        pathname: categorySlug ? "/blog/category/[slug]" : "/blog",
        query: buildQuery(page, keyword, categorySlug),
      },
      undefined,
      { shallow: true }
    );
  };

  // Prevent race conditions
  const requestRef = useRef(0);

  const fetchArticles = async (page: number, keyword: string) => {
    const requestId = ++requestRef.current;
    setIsLoading(true);

    const data = await fetchArticlesNextJs(
      page,
      pageSize,
      keyword,
      categorySlug
    );

    if (requestId === requestRef.current) {
      setArticlesResponse(data);
      setIsLoading(false);
    }
  };

  // Fetch on URL change
  useEffect(() => {
    if (!router.isReady) return;

    if (page === 1 && searchKeyword.length === 0) {
      setArticlesResponse(initialArticlesResponse);
      return;
    }

    fetchArticles(page, searchKeyword);
  }, [page, searchKeyword]);

  // Reset page when keyword changes
  useEffect(() => {
    if (!router.isReady) return;

    if (page !== 1) {
      updateRouter(1, searchKeyword);
    }
  }, [searchKeyword]);

  // Debounced search input → URL
  useEffect(() => {
    if (!router.isReady) return;

    const handler = setTimeout(() => {
      const currentKeyword = (router.query.keyword as string) ?? "";

      // If keyword didn't change, do nothing
      if (searchInput === currentKeyword) return;

      // 🔥 If searching from category page → go to /blog
      if (categorySlug && searchInput.length > 0) {
        router.push(
          {
            pathname: "/blog",
            query: { keyword: searchInput },
          },
          undefined,
          { shallow: true }
        );
        return;
      }

      // Normal blog search
      updateRouter(1, searchInput);
    }, 800);

    return () => clearTimeout(handler);
  }, [searchInput]);

  // Sync input when URL changes (back/forward / direct URL)
  useEffect(() => {
    if (!router.isReady) return;

    const keywordFromUrl = (router.query.keyword as string) ?? "";
    if (keywordFromUrl !== searchInput) {
      setSearchInput(keywordFromUrl);
    }
  }, [router.query.keyword]);

  const handlePageChange = (details: PaginationPageChangeDetails) => {
    updateRouter(details.page, searchKeyword);
  };

  return (
    <>
      <Container maxW="6xl">
        <ArticlesHero
          categories={categoriesResponse.data}
          isSearching={isLoading && page === 1 && searchKeyword.length > 0}
          keyword={searchInput}
          searchFieldTextChanaged={setSearchInput}
        />
      </Container>

      <Spacer p={4} />

      <Container maxW="6xl">
        {!isLoading && <ArticlesList articles={articlesResponse.data} />}
        {isLoading && <ArticleListSkeleton count={pageSize} />}
      </Container>

      <Spacer p={4} />

      <Container maxW="6xl">
        <Center>
          <ArticlePagination
            currentPage={articlesResponse.meta.pagination?.page || 1}
            pageSize={articlesResponse.meta.pagination?.pageSize || pageSize}
            count={Math.max(articlesResponse.meta.pagination?.total ?? 0, 1)}
            onPageChange={handlePageChange}
            isLoading={isLoading}
          />
        </Center>
      </Container>
    </>
  );
};

import {
  ButtonGroup,
  IconButton,
  Pagination,
  PaginationPageChangeDetails,
  Skeleton,
} from "@chakra-ui/react";
import React from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

type ArticlePaginationProps = {
  count: number;
  currentPage: number;
  pageSize: number;
  onPageChange?: (details: PaginationPageChangeDetails) => void;
  isLoading: boolean;
};

const ArticlePagination: React.FC<ArticlePaginationProps> = (
  props: ArticlePaginationProps
) => {
  const { count, currentPage, pageSize, onPageChange, isLoading } = props;

  return (
    <Pagination.Root
      count={count}
      pageSize={pageSize}
      page={currentPage}
      onPageChange={onPageChange}
    >
      {isLoading && (
        <Skeleton>
          <ButtonGroup variant="ghost" size="sm">
            <IconButton>
              <LuChevronLeft />
            </IconButton>
            <IconButton variant={{ base: "ghost", _selected: "outline" }} />
            <IconButton>
              <LuChevronRight />
            </IconButton>
          </ButtonGroup>
        </Skeleton>
      )}
      {!isLoading && (
        <ButtonGroup variant="ghost" size="sm">
          <Pagination.PrevTrigger asChild>
            <IconButton>
              <LuChevronLeft />
            </IconButton>
          </Pagination.PrevTrigger>

          <Pagination.Items
            render={(page) => (
              <Pagination.Item {...page} asChild>
                <IconButton variant={{ base: "ghost", _selected: "outline" }}>
                  {page.value}
                </IconButton>
              </Pagination.Item>
            )}
          />

          <Pagination.NextTrigger asChild>
            <IconButton>
              <LuChevronRight />
            </IconButton>
          </Pagination.NextTrigger>
        </ButtonGroup>
      )}
    </Pagination.Root>
  );
};

export default ArticlePagination;

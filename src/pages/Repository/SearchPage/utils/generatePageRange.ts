import { PAGE_LIMIT } from "../api/getRepositoriesQuery";

const PAGES_TO_LEFT = 4;
const PAGES_TO_RIGHT = 5;
const MAX_PAGES_VISIBLE = 10;

const getLeftPoint = (currentPage: number) => {
  const LOWEST_POINT = 1;
  if (currentPage - PAGES_TO_LEFT < 1) {
    return LOWEST_POINT;
  }
  return currentPage - PAGES_TO_LEFT;
};

const getRightPoint = (totalCount: number, leftPoint: number) => {
  const maxPageAvailable = leftPoint + PAGES_TO_LEFT + PAGES_TO_RIGHT;

  if (totalCount > maxPageAvailable * PAGE_LIMIT) {
    return maxPageAvailable;
  }

  return Math.ceil(totalCount / PAGE_LIMIT);
};

export const generatePageRange = (
  totalCount: number,
  currentPage: number
): { pageFrom: number; pageTo: number } => {
  const pageFrom = getLeftPoint(currentPage);
  const pageTo = getRightPoint(totalCount, pageFrom);
  return { pageFrom, pageTo };
};

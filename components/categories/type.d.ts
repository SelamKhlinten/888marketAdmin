export interface CategoryType {
  name: string;
  id: string;
  imgUrl: string | null;
}

export interface SubCategoryType {
  name: string;
  id: string;
  imgUrl: string | null;
  category: {
    id: number;
    name: string;
  };
}

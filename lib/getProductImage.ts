const productImages: Record<number, string> = {
  1: '/products/star-wand 1.png',
  2: '/products/poison 1.png',
  3: '/products/spirit-lantern 1.png',
  4: '/products/nature-book 1.png',
  5: '/products/mystic-orb 1.png',
  6: '/products/plate-armor 1.png',
  7: '/products/phoenix-feather 1.png',
  8: '/products/war-mace 1.png',
};

export function getProductImage(id: number): string {
  return productImages[id] ?? '/products/placeholder.png';
}
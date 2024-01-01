import type { PageData } from "lume/core.ts";

export const layout = "homepage.njk";

export default function ({ search }: PageData) {
  const posts = search
    .pages()
    .filter((p) => p.src.path.includes("posts"))
    .reverse();

  const years = {};

  for (const post of posts) {
    console.log(post.data.date);
    const year = new Date(post.data.date).getFullYear();
    if (!years[year]) years[year] = [];
    years[year].push(post);
  }

  const ordered = Object.keys(years)
    .map((y) => Number(y))
    .sort((a, b) => b - a);

  return `
    <ul>
      ${ordered
        .map((year) => {
          return (
            `<li class="year">${year}</li>` +
            years[year]
              .map(
                (post) =>
                  `<li><a href="${post.data.url}">${post.data.title}</a></li>`,
              )
              .join(" ")
          );
        })
        .join("")}
    </ul>
  `;
}

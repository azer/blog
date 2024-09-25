import type { PageData } from "lume/core.ts";

export const layout = "homepage.njk";

export default function ({ search }: PageData) {
  const posts = search
    .pages()
    .filter((p) => p.src.path.includes("posts"))
    .sort(
      (a, b) =>
        new Date(b.data.date).getTime() - new Date(a.data.date).getTime(),
    );

  return `
    <ul>
      ${posts
        .map((post) => {
          const date = new Date(post.data.date);
          const formattedDate = `${date.getDate().toString().padStart(2, "0")}.${(date.getMonth() + 1).toString().padStart(2, "0")}.${date.getFullYear()}`;
          return `<li><span class="date">${formattedDate}</span> <a href="${post.data.url}">${post.data.title}</a></li>`;
        })
        .join("")}
    </ul>
  `;
}

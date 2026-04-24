import { validationPaginationParams } from "@/shared/validation/validationParams";
import { Post, PostModelInterface } from "../controllers/post.controller";

export const posts: Post[] = [
  {
    id: 1,
    title: "چگونه یک REST API حرفه‌ای با Node.js بسازیم",
    slug: "build-professional-rest-api-nodejs",
    content:
      "در این مقاله با هم یاد می‌گیریم چگونه یک REST API استاندارد و ماژولار با استفاده از Node.js، Express و MongoDB بسازیم. همچنین درباره اصول طراحی مسیرها، مدیریت خطاها، و ساختاردهی لایه‌های پروژه صحبت خواهیم کرد.",
    createdAt: new Date("2024-11-10T10:00:00"),
    updatedAt: new Date("2024-11-10T10:00:00"),
    author: {
      userID: 10,
      firstName: "علی",
      lastName: "کرمی",
    },
  },
  {
    id: 2,
    title: "راهنمای کامل TypeScript برای توسعه‌دهندگان جاوااسکریپت",
    slug: "complete-typescript-guide-for-js-devs",
    content:
      "TypeScript ابزاری قدرتمند برای ساخت اپلیکیشن‌های بزرگ و نگه‌پذیر است. در این نوشته با مفاهیم پایه تا پیشرفته مانند اینترفیس‌ها، تایپ‌های جنریک، اینفر تایپ‌ها و ساختار پروژه TS آشنا می‌شویم.",
    createdAt: new Date("2024-11-12T14:30:00"),
    updatedAt: new Date("2024-11-12T14:30:00"),
    author: {
      userID: 11,
      firstName: "سارا",
      lastName: "محمودی",
    },
  },
  {
    id: 3,
    title: "معرفی بهترین الگوهای معماری فرانت‌اند در سال ۲۰۲۵",
    slug: "best-frontend-architectures-2025",
    content:
      "در دنیای فرانت‌اند سرعت تغییرات بسیار بالاست. این پست به بررسی الگوهای معماری مطرح مانند Micro-Frontends، Component-Driven Architecture و Meta-Frameworks می‌پردازد و مزایا و معایب هر کدام را بررسی می‌کند.",
    createdAt: new Date("2024-12-01T09:20:00"),
    updatedAt: new Date("2024-12-01T09:20:00"),
    author: {
      userID: 11,
      firstName: "سارا",
      lastName: "محمودی",
    },
  },
  {
    id: 4,
    title: "۱۰ ابزار ضروری برای توسعه‌دهندگان فول‌استک",
    slug: "10-essential-tools-for-fullstack-devs",
    content:
      "برای یک توسعه‌دهنده فول‌استک ابزارهای مناسب اهمیت زیادی دارند. در این مقاله با ابزارهایی مثل Docker، Postman، VSCode Extensions، GitHub Actions و چند ابزار کاربردی دیگر آشنا می‌شویم.",
    createdAt: new Date("2024-12-15T16:45:00"),
    updatedAt: new Date("2024-12-15T16:45:00"),
    author: {
      userID: 11,
      firstName: "سارا",
      lastName: "محمودی",
    },
  },
];

export class PostModelMock implements PostModelInterface {
  async getPostBySlug(slug: string) {
    const post = await posts.find((p) => p.slug === slug);
    return post;
  }
  async getPostList(page = 1, perPage = 10) {
    validationPaginationParams(page, perPage);
    const start = (page - 1) * perPage;
    const end = page * perPage;
    const postList = await posts.slice(start, end);
    return {
      list: postList,
      page,
      perPage,
      count: posts.length,
    };
  }
}

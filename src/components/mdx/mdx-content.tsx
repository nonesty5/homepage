import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

function isSafeHref(value: unknown): value is string {
  if (typeof value !== "string") return false;
  if (value.startsWith("//")) return false;
  if (value.startsWith("/") || value.startsWith("#")) return true;

  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

const components = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote {...props} />
  ),
  a: ({ href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    if (!isSafeHref(href)) {
      return <span {...props} />;
    }

    const isExternal = href.startsWith("http://") || href.startsWith("https://");
    return (
      <a
        {...props}
        href={href}
        rel={isExternal ? "noopener noreferrer" : undefined}
      />
    );
  },
};

export default function MdxContent({ source }: { source: string }) {
  return (
    <div className="prose max-w-none">
      <MDXRemote
        source={source}
        components={components}
        options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
      />
    </div>
  );
}

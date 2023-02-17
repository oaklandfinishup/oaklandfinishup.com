const yaml               = require("js-yaml");
const Image              = require("@11ty/eleventy-img");
const markdownIt         = require("markdown-it");
const markdownItAnchor   = require("markdown-it-anchor");
const markdownItFootnote = require("markdown-it-footnote");
const syntaxHighlight    = require("@11ty/eleventy-plugin-syntaxhighlight");
const eleventySass       = require("eleventy-sass")

async function imageShortcode(src, alt, sizes) {
  let metadata = await Image(src, {
    widths: [300, 600, 900, 1200, 1500, null],
    formats: ["webp", "jpeg"],
	outputDir: "_site/assets/images",
	urlPath: "assets/images",
  });

  let imageAttributes = {
    alt,
    sizes,
    decoding: "async",
  };

  // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
  return Image.generateHTML(metadata, imageAttributes);
}

module.exports = (eleventyConfig) => {
	// Read YAML data files
	eleventyConfig.addDataExtension("yml", contents => yaml.load(contents));

	// Add header anchor and footnotes plugin to Markdown renderer
	const markdownLib = markdownIt({html: true, typographer: true});
	markdownLib.use(markdownItFootnote).use(markdownItAnchor);
	eleventyConfig.setLibrary("md", markdownLib);

	// Converts the given date string to ISO8601 format.
	const toISOString = (dateString) => new Date(dateString).toISOString();
	eleventyConfig.addFilter('date_to_xmlschema', toISOString);

	// Enable syntax highlighting
	eleventyConfig.addPlugin(syntaxHighlight);

	// Enable SASS processing
	eleventyConfig.addPlugin(eleventySass);

	// Image optimization shortcode
	eleventyConfig.addLiquidShortcode("image", imageShortcode);

	// Pass the media assets through to _site
	eleventyConfig.addPassthroughCopy('js');
	eleventyConfig.addPassthroughCopy('css');
	eleventyConfig.addPassthroughCopy('img');
	eleventyConfig.addPassthroughCopy('images');
	eleventyConfig.addPassthroughCopy('fonts');

	// Pass the svg sprite into assets/fonts folder in _site
	eleventyConfig.addPassthroughCopy({ "src/defs/svg/": "/assets/icons" })

	// Pass robots.txt and CloudFlare headers through to _site's root
	// eleventyConfig.addPassthroughCopy({ static: "/" })

	return {
		dir: {
			layouts: "_layouts"
		},
		templateFormats: [
			"html",
			"md",
		]
	};
};

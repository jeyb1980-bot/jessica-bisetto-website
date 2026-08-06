# Blog UI Kit

Index + article view for the journal section. Re-uses `Header.jsx` and `Footer.jsx` from `../website/`.

**Files**
- `BlogList.jsx` — filterable card grid (lead post + grid), sample post data
- `BlogArticle.jsx` — long-form layout with cover image, lede, h2 subheads, pull quote, related posts
- `App.jsx` — switches between list/article
- `blog.css` — extends `../website/styles.css`

**Notes**
- Sample copy is illustrative — replace with real Jessica writing
- Article supports embedded quotes (auto-styled with clay border-left and italic display serif)
- Filter chips are wired to the audience taxonomy (Kinder / Erwachsene / Unternehmen)

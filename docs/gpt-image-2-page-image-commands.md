# GPT Image 2 Commands For Site Images

These are PowerShell-ready commands for generating page images with `gpt-image-2`.

Assumptions:
- Set `OPENAI_API_KEY` only in your local shell before running these commands.
- Outputs go to `output/imagegen/site/` first for review.
- After review, move approved files into `public/images/` with the target names noted below.

## Setup

```powershell
$IMAGE_GEN = "C:\Users\msp05\.codex\skills\imagegen\scripts\image_gen.py"
New-Item -ItemType Directory -Force -Path "output\imagegen\site" | Out-Null
New-Item -ItemType Directory -Force -Path "output\imagegen\site\materials" | Out-Null
New-Item -ItemType Directory -Force -Path "output\imagegen\site\services" | Out-Null
New-Item -ItemType Directory -Force -Path "output\imagegen\site\blog" | Out-Null
```

## Already wired in the codebase

### 1. Home hero
Target after approval: `public/images/hero-home.jpg`

```powershell
python $IMAGE_GEN generate --model gpt-image-2 --size 1536x1024 --quality high --output-format jpg --out "output/imagegen/site/hero-home.jpg" --use-case photorealistic-natural --prompt "Panoramic Seoul skyline seen from a high-rise advisory office at blue hour, elegant and calm." --scene "Premium office interior edge with tall glass windows, city lights beginning to appear, subtle reflections." --subject "The threshold between an interior advisory space and the city outside." --style "Photorealistic editorial photography for a premium tax and advisory website." --composition "Very wide horizontal composition, generous negative space in the center-right for headline text." --lighting "Blue hour, soft interior shadow, refined contrast, cinematic but restrained." --palette "Charcoal, slate, cool gray, muted navy, soft ivory highlights." --materials "Glass reflections, brushed metal, stone, faint paper texture." --constraints "No people, no text, no logos, no watermark." --negative "No tourism vibe, no sci-fi skyline, no cheesy corporate stock-photo vibe, no oversaturated colors."
```

### 2. About hero
Target after approval: `public/images/hero-about.jpg`

```powershell
python $IMAGE_GEN generate --model gpt-image-2 --size 1536x1024 --quality high --output-format jpg --out "output/imagegen/site/hero-about.jpg" --use-case photorealistic-natural --prompt "Refined office interior with a long sightline toward the Seoul skyline, suggesting continuity, judgment, and calm authority." --scene "Minimalist executive workspace with glass, stone, paper, and the city beyond." --subject "A premium advisory environment with architectural clarity." --style "Photorealistic editorial photography." --composition "Wide horizontal composition with elegant empty space for oversized typography." --lighting "Early evening or overcast daylight, introspective and premium." --palette "Charcoal, cool gray, muted navy, soft window highlights." --materials "Stone, glass, paper, brushed metal." --constraints "No people, no text, no logos, no watermark." --negative "No startup-office cliche, no teamwork stock photo, no neon, no handshake."
```

### 3. Home materials: bookkeeping desk
Target after approval: `public/images/materials/bookkeeping-desk.jpg`

```powershell
python $IMAGE_GEN generate --model gpt-image-2 --size 1024x1536 --quality high --output-format jpg --out "output/imagegen/site/materials/bookkeeping-desk.jpg" --use-case photorealistic-natural --prompt "Overhead desk scene with neatly arranged financial statements, calculator, premium black pen, and a subtle coffee cup on a refined dark desk." --scene "Quiet private office desk." --subject "Disciplined bookkeeping review materials." --style "Photorealistic editorial still life." --composition "Top-down crop, balanced geometry, premium publication feel." --lighting "Soft morning side light, serious and precise." --palette "Dark wood, charcoal, paper white, muted navy accents." --materials "Paper, pen, matte calculator, ceramic cup, desk grain." --constraints "No logos, no watermark, no obvious fake numbers as focal point." --negative "No clutter, no cheap stationery look, no colorful office props."
```

### 4. Home materials: lawbook table
Target after approval: `public/images/materials/lawbook-table.jpg`

```powershell
python $IMAGE_GEN generate --model gpt-image-2 --size 1024x1536 --quality high --output-format jpg --out "output/imagegen/site/materials/lawbook-table.jpg" --use-case photorealistic-natural --prompt "Open Korean tax law book and handwritten notes on a large table, premium legal-editorial mood." --scene "Dark wood or stone table in a quiet office." --subject "Law and tax reference materials prepared for careful review." --style "Photorealistic editorial photography." --composition "Close medium shot, left-weighted composition." --lighting "Natural window light, quiet concentration." --palette "Warm paper, charcoal, soft gray, restrained navy." --materials "Paper texture, binding, pen marks, desk surface." --constraints "No logos, no watermark, no staged legal props." --negative "No courtroom cliche, no gavel, no dramatic legal-firm stereotype."
```

### 5. Home materials: desk ink
Target after approval: `public/images/materials/desk-ink.jpg`

```powershell
python $IMAGE_GEN generate --model gpt-image-2 --size 1024x1536 --quality high --output-format jpg --out "output/imagegen/site/materials/desk-ink.jpg" --use-case photorealistic-natural --prompt "Close-up of a hand writing review notes beside printed accounting documents with an elegant fountain pen or premium black pen." --scene "Muted office desk." --subject "The tactile moment of document review and judgment." --style "Photorealistic editorial close-up." --composition "Intimate close crop, tactile detail." --lighting "Focused, calm, intelligent." --palette "Soft paper white, charcoal, cool gray, muted navy." --materials "Paper fibers, pen, skin texture, subtle shadow." --constraints "No visible face, no logos, no watermark." --negative "No flashy jewelry, no staged smile, no clutter, no exaggerated gesture."
```

### 6. Home materials: desk books
Target after approval: `public/images/materials/desk-books.jpg`

```powershell
python $IMAGE_GEN generate --model gpt-image-2 --size 1024x1536 --quality high --output-format jpg --out "output/imagegen/site/materials/desk-books.jpg" --use-case photorealistic-natural --prompt "Stack of tax and accounting reference books, partially opened, with understated paper tabs and working notes." --scene "Archival office shelf meets desk edge." --subject "A still life of serious reference material in active use." --style "Photorealistic editorial still life." --composition "Vertical composition, controlled overlap, premium publication feel." --lighting "Low-key, thoughtful, premium." --palette "Paper white, charcoal, slate, muted blue-gray." --materials "Paper, cloth binding, tabs, desk texture." --constraints "No logos, no watermark." --negative "No old dusty antique look, no messy academic chaos, no library cliche."
```

### 7. Founder support image: pen writing
Target after approval: `public/images/materials/pen-writing.jpg`

```powershell
python $IMAGE_GEN generate --model gpt-image-2 --size 1024x1536 --quality high --output-format jpg --out "output/imagegen/site/materials/pen-writing.jpg" --use-case photorealistic-natural --prompt "Close-up of review notes being written during document analysis, premium advisory atmosphere." --scene "Desk with reviewed papers in a quiet office." --subject "A precise note-taking moment during a professional review." --style "Photorealistic editorial close-up." --composition "Tight crop, hand plus paper only." --lighting "Quiet concentration, refined window light." --palette "Paper white, charcoal, muted navy." --materials "Paper, pen, skin texture, soft shadow." --constraints "No visible face, no text emphasis, no logos, no watermark." --negative "No clutter, no dramatic gesture, no staged stock-photo energy."
```

### 8. Founder support image: book pages
Target after approval: `public/images/materials/book-pages.jpg`

```powershell
python $IMAGE_GEN generate --model gpt-image-2 --size 1024x1536 --quality high --output-format jpg --out "output/imagegen/site/materials/book-pages.jpg" --use-case photorealistic-natural --prompt "Elegant close-up of opened law and accounting reference pages with layered paper texture." --scene "Quiet desk or shelf edge in an advisory office." --subject "Reference pages arranged in a tactile, intelligent composition." --style "Photorealistic editorial still life." --composition "Tight crop, slightly abstract but clearly real." --lighting "Tactile, intellectual, restrained." --palette "Ivory paper, charcoal shadow, soft slate tones." --materials "Page grain, book edge, subtle binding texture." --constraints "No logos, no watermark, no obvious readable headline text." --negative "No dramatic prop styling, no antique-library cliche."
```

## Strong candidates for page-specific hero images

### 9. Practice page hero
Suggested target: `public/images/hero-services.jpg`

```powershell
python $IMAGE_GEN generate --model gpt-image-2 --size 1536x1024 --quality high --output-format jpg --out "output/imagegen/site/hero-services.jpg" --use-case photorealistic-natural --prompt "A disciplined advisory workspace with multiple organized document zones, suggesting bookkeeping, tax adjustment, valuation, and transaction review." --scene "Long table with structured papers, folders, muted monitors, architectural office setting." --subject "A premium systems-driven advisory environment." --style "Photorealistic editorial photography." --composition "Wide horizontal frame with layered depth and preserved headline space." --lighting "Sharp but calm, premium systems-thinking mood." --palette "Charcoal, slate, muted navy, paper white." --materials "Paper, glass, metal, stone, desk surface." --constraints "No people, no text, no logos, no watermark." --negative "No trading floor, no generic meeting room, no teamwork stock photo."
```

### 10. Who page hero
Suggested target: `public/images/hero-who.jpg`

```powershell
python $IMAGE_GEN generate --model gpt-image-2 --size 1536x1024 --quality high --output-format jpg --out "output/imagegen/site/hero-who.jpg" --use-case photorealistic-natural --prompt "Three stages of business maturity implied through one elegant office-city composition, from an early startup desk to a larger executive review environment." --scene "Subtle narrative through layered workspace zones, not a literal collage." --subject "A progression of business complexity told through spaces and materials." --style "Photorealistic editorial photography." --composition "Wide panoramic layout, conceptual but realistic, clean negative space for typography." --lighting "Thoughtful, directional, strategic." --palette "Cool gray, charcoal, muted navy, ivory paper." --materials "Desk surfaces, paper, glass, soft city background." --constraints "No people, no text, no logos, no watermark." --negative "No obvious infographic look, no montage mess, no cheesy visual metaphors."
```

### 11. Founder portrait v2
Suggested target: `public/images/founder-v2.jpg`

```powershell
python $IMAGE_GEN generate --model gpt-image-2 --size 1024x1536 --quality high --output-format jpg --out "output/imagegen/site/founder-v2.jpg" --use-case photorealistic-natural --prompt "Editorial portrait of a Korean CPA founder in a tailored dark suit inside a high-rise Seoul office." --scene "Large window, soft skyline bokeh, elegant architecture." --subject "A calm, sharp, intelligent founder with understated confidence." --style "Premium magazine editorial portrait photography." --composition "Vertical portrait, mid-to-three-quarter length, confident but restrained posture." --lighting "Natural side light, refined contrast, intelligent calm." --palette "Charcoal, navy, soft skin tone, muted city blues." --materials "Suit wool texture, glass, soft skyline blur." --constraints "No text, no logos, no watermark." --negative "No exaggerated smile, no crossed-arms cliche, no visible luxury-flex styling, no actor-headshot vibe."
```

### 12. Pricing page hero
Suggested target: `public/images/hero-pricing.jpg`

```powershell
python $IMAGE_GEN generate --model gpt-image-2 --size 1536x1024 --quality high --output-format jpg --out "output/imagegen/site/hero-pricing.jpg" --use-case stylized-concept --prompt "Minimal premium abstract composition suggesting structured fee logic and clear decision flow." --scene "Dark charcoal background with subtle layered lines, glassy planes, and a restrained blue accent." --subject "Abstract visual logic for a high-trust pricing experience." --style "Photorealistic abstract still life, not a vector infographic." --composition "Wide horizontal composition with strong empty space for large type." --lighting "Clean, rational, premium, calm." --palette "Charcoal, slate, muted navy, soft steel blue." --materials "Glass, matte stone, brushed metal, soft reflections." --constraints "No numbers, no charts, no text, no logos, no watermark." --negative "No neon fintech vibe, no glowing dashboard cliche, no futuristic sci-fi look."
```

### 13. Contact page hero
Suggested target: `public/images/hero-contact.jpg`

```powershell
python $IMAGE_GEN generate --model gpt-image-2 --size 1536x1024 --quality high --output-format jpg --out "output/imagegen/site/hero-contact.jpg" --use-case photorealistic-natural --prompt "Calm private meeting corner in a premium office, ready for a serious first conversation." --scene "Two chairs, small table, notebook, soft window light, Seoul city beyond." --subject "A discreet and trustworthy advisory meeting setting." --style "Photorealistic editorial photography." --composition "Wide but intimate, negative space preserved for text." --lighting "Welcoming but serious, quiet trust." --palette "Warm gray, charcoal, muted navy, ivory highlights." --materials "Fabric, wood, glass, paper." --constraints "No people, no text, no logos, no watermark." --negative "No hotel-lobby vibe, no generic coworking space, no startup cliche."
```

### 14. Blog archive hero
Suggested target: `public/images/hero-blog.jpg`

```powershell
python $IMAGE_GEN generate --model gpt-image-2 --size 1536x1024 --quality high --output-format jpg --out "output/imagegen/site/hero-blog.jpg" --use-case photorealistic-natural --prompt "Editorial writing-and-analysis environment for tax, accounting, and deal insight articles." --scene "Open notebook, marked papers, muted desk objects, clean composition." --subject "A premium publication mood for business and tax insight." --style "Photorealistic editorial photography." --composition "Wide crop with open space for title text." --lighting "Reflective, thoughtful, premium publication feel." --palette "Paper white, charcoal, slate, muted navy." --materials "Paper, pen, desk grain, subtle shadow." --constraints "No text, no logos, no watermark." --negative "No coffee-shop blogger vibe, no clutter, no lifestyle influencer look."
```

## Service detail page hero set

### 15. Tax bookkeeping
Suggested target: `public/images/services/tax-bookkeeping.jpg`

```powershell
python $IMAGE_GEN generate --model gpt-image-2 --size 1536x1024 --quality high --output-format jpg --out "output/imagegen/site/services/tax-bookkeeping.jpg" --use-case photorealistic-natural --prompt "Meticulous monthly bookkeeping review scene, organized ledgers, source documents, and precise categorization workflow." --scene "Premium Seoul advisory office, disciplined materials, muted architecture." --subject "A calm and exact bookkeeping review environment." --style "Photorealistic editorial photography." --composition "Wide horizontal image with subtle depth and title-safe empty space." --lighting "Precise, calm, high-trust." --palette "Charcoal, slate, paper white, muted navy." --materials "Paper, desk surface, pen, calculator, folder edges." --constraints "No people, no text, no logos, no watermark." --negative "No receipt explosion, no clutter, no small-business stereotype."
```

### 16. Tax adjustment
Suggested target: `public/images/services/tax-adjustment.jpg`

```powershell
python $IMAGE_GEN generate --model gpt-image-2 --size 1536x1024 --quality high --output-format jpg --out "output/imagegen/site/services/tax-adjustment.jpg" --use-case photorealistic-natural --prompt "High-level tax adjustment review with annotated statements, structured comparison sheets, and a formal review atmosphere." --scene "Premium advisory office with disciplined paper layout." --subject "Tax adjustment as a careful review process." --style "Photorealistic editorial photography." --composition "Wide horizontal image with clean title space." --lighting "Controlled window light, premium restraint." --palette "Charcoal, slate, ivory paper, muted blue-gray." --materials "Paper stacks, markup notes, calculator, folder tabs." --constraints "No people, no text, no logos, no watermark." --negative "No calculator-only cliche, no messy desk, no legal-drama styling."
```

### 17. Tax advisory
Suggested target: `public/images/services/tax-advisory.jpg`

```powershell
python $IMAGE_GEN generate --model gpt-image-2 --size 1536x1024 --quality high --output-format jpg --out "output/imagegen/site/services/tax-advisory.jpg" --use-case photorealistic-natural --prompt "Scenario-comparison advisory setup with multiple decision paths laid out on a clean desk, strategic judgment mood." --scene "Premium Seoul advisory office, quiet strategic review setting." --subject "Decision-making supported by structured comparison." --style "Photorealistic editorial photography." --composition "Wide horizontal frame with elegant negative space." --lighting "Strategic, calm, high-trust." --palette "Charcoal, slate, muted navy, paper white." --materials "Paper, folders, pen, subtle glass reflection." --constraints "No people, no text, no logos, no watermark." --negative "No consultant-pointing-at-screen cliche, no startup workshop vibe."
```

### 18. Valuation
Suggested target: `public/images/services/valuation.jpg`

```powershell
python $IMAGE_GEN generate --model gpt-image-2 --size 1536x1024 --quality high --output-format jpg --out "output/imagegen/site/services/valuation.jpg" --use-case photorealistic-natural --prompt "Valuation working session with financial model printouts, comparable analysis materials, and a premium analytical still life." --scene "Minimal executive office desk with disciplined review materials." --subject "Valuation work as a precise, high-stakes analytical process." --style "Photorealistic editorial photography." --composition "Wide image, structured foreground, empty title-safe zone." --lighting "Quiet rigor, controlled contrast." --palette "Slate, charcoal, ivory, muted blue-gray." --materials "Paper, spreadsheet printouts, pen, monitor edge, stone desk." --constraints "No people, no text, no logos, no watermark." --negative "No fake stock chart wall, no finance-bro cliche, no trading-floor energy."
```

### 19. Transaction advisory
Suggested target: `public/images/services/transaction-advisory.jpg`

```powershell
python $IMAGE_GEN generate --model gpt-image-2 --size 1536x1024 --quality high --output-format jpg --out "output/imagegen/site/services/transaction-advisory.jpg" --use-case photorealistic-natural --prompt "M and A and deal review atmosphere with due diligence binders, marked documents, and calm negotiation-ready intensity." --scene "Premium advisory office, private review table, structured files." --subject "A disciplined transaction review environment." --style "Photorealistic editorial photography." --composition "Wide horizontal composition with layered documents and negative space." --lighting "Quiet intensity, premium restraint." --palette "Charcoal, muted navy, ivory paper, soft gray." --materials "Binders, paper tabs, pen marks, desk surface." --constraints "No people, no text, no logos, no watermark." --negative "No handshake, no celebration, no stock-market screen wall, no trading-floor cliche."
```

### 20. Audit advisory
Suggested target: `public/images/services/audit-advisory.jpg`

```powershell
python $IMAGE_GEN generate --model gpt-image-2 --size 1536x1024 --quality high --output-format jpg --out "output/imagegen/site/services/audit-advisory.jpg" --use-case photorealistic-natural --prompt "Audit preparation environment with reconciled files, review marks, and controlled professional rigor." --scene "Premium advisory office with clean, disciplined materials." --subject "Audit readiness shown through structured documentation." --style "Photorealistic editorial photography." --composition "Wide horizontal frame with title-safe negative space." --lighting "Calm rigor, soft window light, refined contrast." --palette "Charcoal, slate, ivory paper, muted navy." --materials "Reviewed files, tabs, pen marks, desk edge, subtle glass." --constraints "No people, no text, no logos, no watermark." --negative "No courtroom vibe, no legal drama, no messy evidence-board look."
```

## Blog cover system example

### 21. Blog cover template example
Suggested target: `public/images/posts/example-gpt-image-2.png`

```powershell
python $IMAGE_GEN generate --model gpt-image-2 --size 1024x1536 --quality high --output-format png --out "output/imagegen/site/blog/example-gpt-image-2.png" --use-case infographic-diagram --prompt "Premium editorial infographic cover for a Korean tax and accounting article comparing two legal or tax outcomes." --scene "Warm ivory background with subtle paper texture." --subject "One central comparison visual with a clear hierarchy and restrained footer area." --style "Clean editorial infographic, high-trust publication style." --composition "Vertical 4 to 5 layout, strong headline zone at top, one central visual metaphor, restrained footer brand area." --lighting "Clean, intelligent, minimal." --palette "Ivory, charcoal, muted navy, soft steel blue." --materials "Paper texture, simple geometric forms, precise diagram shapes." --text "Use only minimal, accurate Korean text if text is necessary." --constraints "No logo clutter, no watermark, no childish icons." --negative "No playful startup illustration vibe, no cartoon icons, no messy dashboard screenshot aesthetic."
```

## Suggested next step

If you want to generate only the highest-value assets first, run these in order:

1. `hero-home.jpg`
2. `hero-about.jpg`
3. `hero-pricing.jpg`
4. `hero-contact.jpg`
5. `materials/bookkeeping-desk.jpg`
6. `materials/lawbook-table.jpg`
7. `materials/desk-ink.jpg`
8. `materials/desk-books.jpg`

After review, copy the approved outputs into `public/images/` with the target names above.

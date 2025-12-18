# 🔍 Example Images Not Showing? Here's Why

## If Testing Locally

**Restart your dev server:**
```bash
cd frontend
npm run dev
```

The images should appear below the upload area.

## If Testing on Render

**The frontend needs to be redeployed:**

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Open your **Static Site** (frontend service)
3. Click **"Manual Deploy"** → **"Deploy latest commit"**
4. Wait 1-2 minutes for build
5. Refresh your analyze page

## Where to Look

The example images appear:
- **Below** the upload area
- **Below** the "Analyze Tumor" button
- Only when **no image is uploaded** (when upload area is empty)

## What You Should See

```
[Upload Area - empty]

[Analyze Tumor button]

─────────────────────────
Or try with example images:

[Example: Tumor]  [Example: Normal]
   [Image]          [Image]
```

## If Still Not Showing

1. **Check browser console** (F12) for errors
2. **Check Network tab** - are images loading? (should see `/images/example_tumor.jpg`)
3. **Hard refresh**: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

## Image Paths

Images are at:
- `/images/example_tumor.jpg` (Y169 - tumor example)
- `/images/example_normal.jpg` (N22 - normal example)

These are in `frontend/public/images/` and get copied to `dist/images/` during build.

---

**After redeploying the frontend on Render, the example images will appear!** 🚀


import os
import zipfile

root = r"C:\Users\pavil\.gemini\antigravity\scratch\kailasa-trails"
out_zip = os.path.join(root, "dist", "public", "kailasa-trails-complete.zip")

print("Building ZIP...")
with zipfile.ZipFile(out_zip, "w", zipfile.ZIP_DEFLATED, strict_timestamps=False) as z:
    for dirpath, dirnames, filenames in os.walk(root):
        rel_dir = os.path.relpath(dirpath, root)
        if "node_modules" in rel_dir or ".git" in rel_dir:
            continue
        for fn in filenames:
            if fn.endswith(".zip"):
                continue
            full_path = os.path.join(dirpath, fn)
            rel_path = os.path.relpath(full_path, root)
            try:
                z.write(full_path, rel_path)
            except Exception as e:
                # Fallback to manual ZipInfo with valid timestamp
                zinfo = zipfile.ZipInfo(rel_path, (2026, 1, 1, 0, 0, 0))
                with open(full_path, "rb") as f:
                    z.writestr(zinfo, f.read())

size_mb = os.path.getsize(out_zip) / (1024 * 1024)
print(f"ZIP created successfully: {size_mb:.2f} MB")

#!/usr/bin/env python3
"""Restore the two original large assets, verifying their SHA-256 hashes."""
from pathlib import Path
import hashlib
import json
import os

root = Path(__file__).resolve().parent
manifest = json.loads((root / "large-file-parts/manifest.json").read_text())
for item in manifest:
    target = root / item["path"]
    if target.exists():
        if hashlib.sha256(target.read_bytes()).hexdigest() == item["sha256"]:
            print("Already restored:", item["path"])
            continue
        raise SystemExit("Refusing to overwrite a changed file: " + item["path"])
    data = b"".join((root / part).read_bytes() for part in item["parts"])
    if len(data) != item["size"] or hashlib.sha256(data).hexdigest() != item["sha256"]:
        raise SystemExit("Integrity check failed: " + item["path"])
    target.parent.mkdir(parents=True, exist_ok=True)
    temp = target.with_name(target.name + ".restoring")
    temp.write_bytes(data)
    os.replace(temp, target)
    print("Restored:", item["path"])

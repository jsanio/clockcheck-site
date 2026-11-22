#!/bin/sh
# Renders _design/og-card.html (navy by default; add #ivory for the light version) to assets/og-card.png
# (1200 x 630) with headless Chrome.
# Usage: sh _design/render-og-card.sh            (navy, the published one)
#        CARD_THEME=ivory sh _design/render-og-card.sh
set -e
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --allow-file-access-from-files \
  --force-device-scale-factor=1 --window-size=1200,630 --virtual-time-budget=4000 \
  --screenshot="$ROOT/assets/og-card.png" "file://$ROOT/_design/og-card.html${CARD_THEME:+#$CARD_THEME}" >/dev/null 2>&1
python3 - "$ROOT/assets/og-card.png" <<'PY'
import sys
from PIL import Image
im = Image.open(sys.argv[1]); print(sys.argv[1].split('/')[-1], im.size)
PY

# Pixel adventure baseline

Current direction is the original GitHub pixel quest from commit `6453c00`, as explicitly selected by the user. The white/green documentation redesign was rejected and is superseded.

- Navy #151d38, yellow #ffdc4c; blue SEO sky, purple ASO sky and teal GEO sky.
- Original CSS robot, cloud silhouettes, coins, hills, brick blocks, pipe and tiled ground.
- Chinese display: ZCOOL KuaiLe; English pixel labels: Press Start 2P; normal system sans for explanations.
- Homepage: one large world scene, three topic cartridges, a practical next-step section and short FAQ.
- Dedicated `/demo/`: preserve the original three-topic, eight-step game. Refinements are scoped to isolation, clarity, keyboard behavior and mobile layout.
- `/learn/*/`: longer explanations and developer checklists outside the playfield, using the same pixel identity.
- Desktop scene remains readable without side panels covering the middle. Mobile confines horizontal scrolling to the stage map and keeps the active block visible.

No new raster concept art substitutes for the existing code-native pixel system. The visual reference is the original source itself; compare the stage composition, palette, sprites, block styling and HUD against that commit. Browser evidence is saved locally under `output/playwright/`.

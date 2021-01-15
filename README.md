# M133_Einzelprojekt

Anleitung:
Um das Projekt lauffähig laufen zu lassen, ist Deno benötigt, welches auf "https://deno.land/#installation" nachgeholt werden kann.

Um das Programm zu starten, im Ordner "M133_Einzelprojekt" im cmd den code "start.sh" eingeben oder die Shell-Datei "start.sh" starten.
Eventuell zuerst den Code "deno run --allow-read --allow-write --unstable ./tools/builder.ts", um die benötigte Datei zu bilden,
und dann "deno run --allow-net --allow-read ./backend/api.ts" eingeben, um die Api-Datei zu hosten, mitsamt der Webseite.

Autor:
Die Ganze Projekt-Arbeit wurde von "Nicolas Kingsman" geschrieben.

Pages:
localhost:8000 -> Die Startseit, displayed eine Liste von Produkten.
localhost:8000/detail/:id -> Die Detail-Seite, zum angeklicktem Produkt.
localhost:8000/cart -> Der Warenkorb
localhost:8000/checkout -> Daten eingeben, um den Einkauf abzuschliessen

Warnung:
In Typescript-Dateien werden Fehler vom Code vorgeschlagen, aber der Code soll per Kompiler noch richtig funktionieren.

Dateien-Info:
backend/api -> Die Api, welches den "Index.html" hosten wird und als Api fungiert.
common/types.ts -> Interfaces, für individuelle Objekte.
frontend/assets -> Dort sind Assets, wie Json und Bilder Dateien.
frontend/controllers -> Typescript-Dateien, dessen für eine bestimmte Page, die Index-html gemäss anpassen.
frontend/build.app.js -> Beim Downloaden nciht ersichtlich, aber durch "builder.ts" wird es gebuilded und fungiert als Schnittstelle von Typescript zu Html.
frontend/fileManager.ts -> Sortiert "*.controller.ts"-Dateien, gemäss der Page.
frontend/index.css -> Das Styling, für die Index.html.
frontend/index.html -> Die Hauptstruktur für jede Page.
tools/builder.ts -> Impotiert "filemanager.ts" und konventiert in "builder.app.js"
.gitignore -> Welche Dateien autmatisch ignoriert werden bei der Versionierung im Git (Momentan nur Javascript-Dateien).
README.md -> Die Anleitung zum Programm.
start.sh -> Die Shell-Datei, welches das Projekt die fehlende Javascript-Datei builded und die Api-hostet.
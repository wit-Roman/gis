package main

import (
	"log"
	"net/http"
	"path/filepath"
	"strings"
)

// Функция для включения CORS
func enableCORS(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		filePath := r.URL.Path
		ext := strings.ToLower(filepath.Ext(filePath))

		// Проверяем, является ли файл PBF, чтобы добавить нужные заголовки
		if ext == ".pbf" {
			w.Header().Set("Content-Type", " application/vnd.mapbox-vector-tile")
			// Используйте application/x-protobuf, если это подходит для вашего случая
			w.Header().Set("Content-Encoding", "gzip") // если файлы сжаты gzip
		}

		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		// Разрешаем предзапросы OPTIONS для CORS
		if r.Method == http.MethodOptions {
			return
		}

		h.ServeHTTP(w, r)
	})
}

func main() {
	// Создаём файловый сервер для директории с тайлами
	fs := http.FileServer(http.Dir("./tiles"))
	http.Handle("/tiles/", enableCORS(http.StripPrefix("/tiles/", fs)))

	// Запуск сервера
	log.Println("Server starting on :8081...")
	log.Fatal(http.ListenAndServe(":8081", nil))
}

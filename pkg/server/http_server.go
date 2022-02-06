package server

import (
	"context"
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
)

var log = logrus.New()

type HTTPServer struct {
	ginHandler        *gin.Engine
	tlsPrivateKeyPath string
	tlsCertPath       string
	port              int
	httpServer        *http.Server
}

func CreateHTTPServer(port int, tlsPrivateKeyPath string, tlsCertPath string) *HTTPServer {
	server := &HTTPServer{}
	server.port = port
	server.tlsPrivateKeyPath = tlsPrivateKeyPath
	server.tlsCertPath = tlsCertPath
	server.ginHandler = gin.Default()
	server.ginHandler.Use(cors.Default())

	fmt.Println(port)

	server.httpServer = &http.Server{
		Addr:    ":" + strconv.Itoa(port),
		Handler: server.ginHandler,
	}
	gin.SetMode(gin.DebugMode)

	server.ginHandler.LoadHTMLGlob("./web/templates/*.tmpl")
	server.ginHandler.GET("/", server.handleIndexPage)
	server.ginHandler.GET("/pages/login", server.handleLoginPage)
	server.ginHandler.StaticFS("/static", http.Dir("./web/static"))

	return server
}

func (server *HTTPServer) ServeForever() error {
	return server.httpServer.ListenAndServeTLS(server.tlsCertPath, server.tlsPrivateKeyPath)
}

func (server *HTTPServer) Shutdown() error {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := server.httpServer.Shutdown(ctx); err != nil {
		return err
	}
	return nil
}

func (server *HTTPServer) handleLoginPage(c *gin.Context) {
	c.HTML(http.StatusOK, "login.tmpl", gin.H{
		"port":    server.port,
		"version": time.Now().String(),
		"page":    "login",
	})
}

func (server *HTTPServer) handleIndexPage(c *gin.Context) {
	c.HTML(http.StatusOK, "index.tmpl", gin.H{
		"port":    server.port,
		"version": time.Now().String(),
		"page":    "index",
	})

}

/*
func HTTPAPIServerDocumentation(c *gin.Context) {
	c.HTML(http.StatusOK, "documentation.tmpl", gin.H{
		"port":    ServerHTTPPort(),
		"version": time.Now().String(),
		"page":    "documentation",
	})
}

func HTTPAPIStreamList(c *gin.Context) {
	c.HTML(http.StatusOK, "stream_list.tmpl", gin.H{
		"port":    ServerHTTPPort(),
		"version": time.Now().String(),
		"page":    "stream_list",
	})
}
func HTTPAPIPageLogin(c *gin.Context) {
	c.HTML(http.StatusOK, "login.tmpl", gin.H{
		"port":    ServerHTTPPort(),
		"version": time.Now().String(),
		"page":    "login",
	})
}

//CrossOrigin Access-Control-Allow-Origin any methods
func CrossOrigin() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	}
} */

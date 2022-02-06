package main

import (
	"fmt"
	"os"

	"github.com/colonyos/dashboard/pkg/server"
)

func main() {
	httpServer := server.CreateHTTPServer(9090, "./cert/server.key", "./cert/server.crt")
	err := httpServer.ServeForever()
	if err != nil {
		fmt.Println(err)
		os.Exit(-1)
	}

	wait := make(chan bool)
	<-wait
}

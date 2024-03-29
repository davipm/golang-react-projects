package main

import "fmt"

func main() {
	var jobs = make(chan int, 5)
	var done = make(chan bool)

	go func() {
		for {
			var j, more = <-jobs
			if more {
				fmt.Println("received job", j)
			} else {
				fmt.Println("received all jobs")
				done <- true
				return
			}
		}
	}()

	for j := 1; j <= 3; j++ {
		jobs <- j
		fmt.Println("sent job", j)
	}
	close(jobs)
	fmt.Println("sent all jobs")

	<-done
}

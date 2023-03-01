package com.x00179223.librarybackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;


@SpringBootApplication
@ComponentScan(basePackages = "com.x00179223.librarybackend")
public class LibrarybackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(LibrarybackendApplication.class, args);
	}

}

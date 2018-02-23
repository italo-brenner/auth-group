package br.com.authgroup.converter;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BeanConfig {
	
	@Bean
	public Converter getConverter() {
		return new Converter();
	}

}

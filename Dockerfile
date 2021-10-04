FROM ruby:2.5
WORKDIR /opt/portfolio

COPY . /opt/portfolio/

RUN gem install sassc -v '2.4.0' --source 'https://rubygems.org/'

RUN gem uninstall bundle
RUN gem install bundler -v 2.1.4

RUN bundle install --path vendor/bundle
EXPOSE 3000
RUN bundle exec jekyll serve


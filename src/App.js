import React, { Component } from 'react';
import fire from './fire';
import './App.css';

class App extends Component {
  componentWillMount() {
    var self = this;

    fire.database().ref('/').on('value', function(snapshot) {
      self.setState({
        'data': snapshot.val()
      });
    });
  }

  get_post(post) {
    var author = this.state.data.author[post.author_id];

    var date_object = post.date;
    var pretty_date = date_object.day_of_week + ', ' +
      date_object.date + ' ' +
      date_object.month + ' ' +
      date_object.year + ' at ' +
      date_object.hour + ':' +
      (date_object.minute < 10 ? '0' : '') + date_object.minute + ' ' +
      date_object.meridian;

    return (
      <div className="post" key={ post.post_id }>
        <h2><strong>{ post.name }</strong></h2>
        <p className="post-signature"><em>By: {author.first_name} {author.last_name} on { pretty_date }</em></p>
        <pre className="post-intro">{ post.intro }</pre>
        <img width="100%" alt={ post.title } src={ post.image_url }></img>
        <pre className="post-content" dangerouslySetInnerHTML={{__html: post.content}}></pre>
      </div>
    )
  }

  render() {
    var self = this;

    var posts = [];
    if (this.state && this.state.data && this.state.data.post) {
      for (var post_id in this.state.data.post) {
        var post = this.state.data.post[post_id];
        post.post_id = post_id;
        posts.push(post);
      }
    }

    return (
      <div id="content">
        <h1 id="title">Our Blog</h1>
        <div>
          {
            posts.map(post =>
              self.get_post(post)
            )
          }
        </div>
      </div>
    );
  }
}

export default App;


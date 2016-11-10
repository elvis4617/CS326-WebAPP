import React from 'react';

export default class Mail extends React.Component {
  render(){
    return(
      <div>
      <div className="media">
        <div className="media-left media-top">
          <img className="media-object" src="img/pineapple_profile_pic.png" alt="Generic placeholder image"/>
        </div>
        <div className="media-body">
          <div className="media-body">
              <a href="#">{this.props.author}</a>
              <br /> {this.props.title}
              <br /><span className="pull-right"><a href="#" >Accepted</a> · <a href="#" >Peace Out</a> · <a type="button" data-toggle="modal" data-target="#modal-content-1">Details</a> · {this.props.postDate}</span>
                <div className="modal fade" id="modal-content-1" role="dialog">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                        <h4 className="modal-title">Join Us Now! <small>Someone</small></h4>
                      </div>
                      <div className="modal-body">
                        <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque aliquet blandit maximus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec convallis erat a ante porta vehicula. Vivamus maximus justo non purus tempor consequat. Mauris eleifend lorem dui. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In pellentesque commodo elementum. In id maximus lectus, sit amet ornare nibh. Aliquam tristique, nunc ac imperdiet rutrum, urna ex consectetur mi, in dapibus orci quam in diam. Nam vel arcu a diam facilisis lacinia nec vitae diam. Curabitur tincidunt ipsum et nunc placerat, at cursus mauris bibendum. Nam mi leo, pharetra in felis sit amet, aliquet viverra dolor. Nunc pharetra dignissim risus.

                              Cras tincidunt tempor aliquam. Ut tempus tortor sodales, finibus enim nec, lacinia nisi. Donec suscipit elit a sapien finibus convallis. Vestibulum eleifend pharetra volutpat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla ultrices mi at sagittis volutpat. In aliquet sollicitudin urna ac imperdiet. Nunc erat mi, fermentum tincidunt massa vitae, elementum blandit nulla. Aliquam in consequat elit, nec pretium odio. Praesent fringilla mauris ut nunc congue, eu efficitur mauris elementum. Pellentesque vestibulum fermentum neque, ut aliquet velit sagittis in. Sed eget gravida lorem, quis tempus mi.

                              Ut a purus hendrerit, ullamcorper arcu vitae, elementum purus. Integer accumsan venenatis consectetur. Mauris malesuada odio quis nisl pretium pretium. Mauris sollicitudin, nisl at luctus interdum, quam nibh congue tellus, vitae dignissim odio dolor at mi. In et felis vitae ipsum tempor tincidunt vel eu nisl. Vestibulum vestibulum ligula ut varius dignissim. In tempus sapien vel dui finibus, non pulvinar dui pharetra. In non molestie lorem. Mauris lobortis mi eu leo bibendum, nec lobortis sapien vehicula. Maecenas non magna eu nisl interdum porttitor sed et ipsum. Mauris vel dolor congue, iaculis orci tincidunt, accumsan enim. Cras congue faucibus tellus, sed maximus leo mollis eget. Curabitur congue nibh a nisi efficitur faucibus.

                              Praesent sit amet posuere elit, a euismod lorem. Phasellus vulputate magna mi, non vestibulum mauris porta eu. Proin congue purus vitae felis sagittis, eu cursus mauris ullamcorper. Cras aliquet, risus vitae tristique fringilla, purus tellus posuere tellus, non imperdiet nunc augue vitae purus. Donec malesuada risus sed sodales egestas. Nunc congue dapibus magna, eget consectetur risus tincidunt a. Sed ultrices lobortis risus euismod cursus. In eu porta velit. In tincidunt lacinia nulla posuere luctus.

                              In varius sit amet odio eget auctor. Pellentesque vitae velit venenatis ligula faucibus rhoncus. Sed fermentum augue et scelerisque fringilla. Mauris id dui ut eros lacinia dictum sit amet ut ligula. Praesent nec ex hendrerit, pharetra est a, volutpat massa. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam tempus, nulla a lacinia vulputate, sem tortor scelerisque sem, nec vestibulum nisl lacus at risus.
                        </p>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                      </div>
                    </div>
                  </div>
                </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

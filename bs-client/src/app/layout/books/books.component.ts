import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {Router} from '@angular/router';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
// import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { SERVER_HOST } from '../../services/constants';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  closeResult: string;
  baseUrl: any;
  user: any;
  booksData: any;
  topBooksData: any;
  searchFor: String;
  searchData: any = [];
  bimg: any;
  imgUrl: any;

  btitle: String;
  bauthor: String;
  blanguage: String;
  bpages: String;
  byear: String;


  constructor(
    // private validateService: ValidateService,
    private modalService: NgbModal,
    private authService: AuthService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef
  ) {
    this.baseUrl = SERVER_HOST;
    this.toastr.setRootViewContainerRef(vcr);
    this.authService.getAllBooks().subscribe(data => {
      this.booksData = data.books;
    });
    this.authService.getTopFiveBooks().subscribe(data => {
      this.topBooksData = data.books;
    });
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  onChange(event:any) {
    var files = event.srcElement.files;
    this.bimg = files[0].name;
    var imgType = ['jpg', 'jpeg', 'png'];
    if(imgType.indexOf(this.bimg.split('.').pop().toLowerCase()) > -1 ){
      this.authService.sendFileToUpload(files).subscribe(data => {
        if(data.success){
            this.imgUrl = SERVER_HOST+'img/'+this.bimg;
            this.toastr.success('File uploaded successfully.', 'Success!');
          }
      });
    } else {
       this.toastr.error('Only JPG, JPEG and PNG can be uploaed', 'Error!'); 
    }
  }
  onBookSearchSubmit(){
    const sdata =   {
      text: this.searchFor
    };
    this.authService.searchInBooks(sdata).subscribe(data => {
      if (data.success) {
        this.toastr.success('Choose search result from dropdown', 'Success!');
        this.searchData = data.books;
        $('#searchFor').dblclick();
      } else {
         this.toastr.error('Something went wrong!', 'Error!');
      }
    });
  }
  onBookSubmit() {
    const book =   {
      author: this.bauthor,
      imageLink: this.bimg,
      language: this.blanguage,
      pages: this.bpages,
      title: this.btitle,
      addedBy: this.user.email,
      year: this.byear
    };
    this.authService.addNewBooks(book).subscribe(data => {
      if (data.success) {
        this.toastr.success('New book added successfully.', 'Success!');
        this.clearForm();
        this.booksData.push(data.book);
      } else {
         this.toastr.error('Something went wrong!', 'Error!');
      }
    });
  }
  clearForm() {
    this.btitle = '';
    this.bauthor = '';
    this.blanguage = '';
    this.bpages = '';
    this.byear = '';
    this.bimg = '';
  }

  increaseSearchCounter(id){
    this.authService.increaseCounter(id).subscribe(data => {
      if (data.success) {
        alert("done");
      } else {

      }
    });
  }
  deleteThisBook(id, index) {
    this.authService.deleteBooks(id).subscribe(data => {
      if (data.success) {
        this.toastr.success('Book deleted successfully.', 'Success!');
        this.booksData.splice(index, 1);
      } else {
        this.toastr.error('Something went wrong!', 'Error!');
      }
    });
  }

onLoggedout() {
  localStorage.clear();
}  

open(content) {
  this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
  } else {
      return  `with: ${reason}`;
  }
}

}
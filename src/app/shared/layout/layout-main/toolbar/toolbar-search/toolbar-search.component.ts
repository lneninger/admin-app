import { animate, AnimationEvent, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { fromEvent, merge, of } from 'rxjs';
import { debounceTime, filter, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-toolbar-search',
  templateUrl: './toolbar-search.component.html',
  styleUrls: ['./toolbar-search.component.scss'],
  animations: [
    trigger('searchToggle', [

      state('open', style({
        width: '100%',
        padding: '1rem'
      })),
      state('close', style({
        width: '0px',
      })),
      state('open-searchresult', style({
        display: 'block'
      })),
      state('close-searchresult', style({
        height: '0px',
        display: 'none'
      })),
      transition('void => close', [animate('0s')]),
      transition('* => close', [animate('0.2s')]),
      transition('* => open', [animate('0.5s')]),

    ])
  ]
})
export class ToolbarSearchComponent implements OnInit, AfterViewInit {


  @ViewChild('searchContainer')
  searchContainer: ElementRef;

  @ViewChild('searchInput')
  searchInput: ElementRef;

  showSearch: boolean;


  showSearchResultDialog: boolean;



  searchText: string;
  clickInside: boolean;


  result = [
    {
      id: 1,
      name: 'John Smitch',
      tenant: 'UHC'
    },
    {
      id: 2,
      name: 'John Smitch',
      tenant: 'UHC'
    },
    {
      id: 3,
      name: 'John Smitch',
      tenant: 'UHC'
    },
    {
      id: 4,
      name: 'John Smitch',
      tenant: 'UHC'
    },
    {
      id: 5,
      name: 'John Smitch',
      tenant: 'CTC'
    },
    {
      id: 6,
      name: 'John Smitch',
      tenant: 'UHC'
    },
    {
      id: 7,
      name: 'John Smitch',
      tenant: 'EBM'
    },
    {
      id: 8,
      name: 'John Smitch',
      tenant: 'UHC'
    },
    {
      id: 9,
      name: 'John Smitch',
      tenant: 'UHC'
    },
    {
      id: 10,
      name: 'John Smitch',
      tenant: 'ETC'
    }

  ]
  // dialogRef: MatDialogRef<ToolbarSearchDialogComponent, any>;

  constructor(public dialog: MatDialog) {

  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.initializeSearchListener();
  }


  @HostListener('click')
  click() {
    this.clickInside = true;
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    // debugger;
    if (!this.clickInside) {
      // debugger;
      this.showSearch = false;
      this.showSearchResultDialog = false;
    }

    this.clickInside = false;
  }



  toggleSearch() {
    this.showSearch = !this.showSearch;
    if (!this.showSearch) {
      this.showSearchResultDialog = false;
    }
  }

  captureDoneEvent(event: AnimationEvent) {
    if (event.toState === 'open') {
      // debugger;
      this.searchInput.nativeElement.focus();
    }
  }

  initializeSearchListener() {

    const inputEvent = fromEvent(this.searchInput.nativeElement, 'input');
    const deleteEvent = fromEvent(this.searchInput.nativeElement, 'keyup').pipe(startWith(null), filter((event: KeyboardEvent) => {
      return ['Backspace', 'Delete'].some(key => !event || event.key === key);
    }));

    const showResultDialog = merge(inputEvent, deleteEvent).subscribe(result => {
      if (result != null) {
        // debugger;
        this.showSearchResultDialog = true;
      }
    });

    const event$ = merge(inputEvent, deleteEvent)
      .pipe(
        startWith(null),
        filter(_ => {
          return !this.searchInput.nativeElement.value || (this.searchInput.nativeElement.value.trim().length === 0 || this.searchInput.nativeElement.value.length > 2);
        }),
        debounceTime(200),
        switchMap(_ => {
          return this.search();
        })
      )
      .subscribe(result => {
      });




  }

  search() {
    return of(this.result);
  }

  // openDialog(): void {
  //   this.dialogRef = this.dialog.open(ToolbarSearchDialogComponent, {
  //     width: '250px'
  //   });

  //   this.dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //   });
  // }

}


// @Component({
//   selector: 'app-toolbar-search-dialog',
//   templateUrl: 'toolbar-search-dialog.component.html',
// })
// export class ToolbarSearchDialogComponent {

//   constructor(
//     public dialogRef: MatDialogRef<ToolbarSearchDialogComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

//   onNoClick(): void {
//     this.dialogRef.close();
//   }

// }

// export interface DialogData {
//   animal: string;
//   name: string;
// }

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBlogpost } from './add-blogpost';
import { provideRouter } from '@angular/router';
import { provideMarkdown } from 'ngx-markdown';

describe('AddBlogpost', () => {
  let component: AddBlogpost;
  let fixture: ComponentFixture<AddBlogpost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBlogpost],
       providers: [
        provideRouter([]),
         provideMarkdown(),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBlogpost);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

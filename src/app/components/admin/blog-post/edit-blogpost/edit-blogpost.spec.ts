import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBlogpost } from './edit-blogpost';
import { provideMarkdown } from 'ngx-markdown';
import { provideRouter } from '@angular/router';

describe('EditBlogpost', () => {
  let component: EditBlogpost;
  let fixture: ComponentFixture<EditBlogpost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditBlogpost],
      providers: [
        provideRouter([]),
        provideMarkdown(),
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EditBlogpost);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

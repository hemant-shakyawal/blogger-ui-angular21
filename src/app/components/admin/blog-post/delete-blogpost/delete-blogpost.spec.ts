import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBlogpost } from './delete-blogpost';
import { provideRouter } from '@angular/router';

describe('DeleteBlogpost', () => {
  let component: DeleteBlogpost;
  let fixture: ComponentFixture<DeleteBlogpost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteBlogpost],
      providers: [
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DeleteBlogpost);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

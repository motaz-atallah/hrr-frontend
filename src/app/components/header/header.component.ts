import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() gradientBackground = false;

  private selectedText = '';

  isMenuOpened = false;
  constructor(private readonly router: Router,
    private readonly authService: AuthService) { }

  async onClick(path: string): Promise<void> {
    this.selectedText = path;
    await this.router.navigateByUrl(path);
  }

  onMenuClick() {
    this.isMenuOpened = !this.isMenuOpened;
  }

  get headerClass() {
    let className = 'site-header';
    if (this.gradientBackground)
      className += ' header-over';
    else
      className += ' site-header-height';
    if (this.isMenuOpened)
      className += ' nav-open';
    return className;
  }

  isSelectedItem(name: string): boolean {
    return name === this.selectedText;
  }

  async logout() {
    this.authService.logout();
    await this.router.navigateByUrl('/home');
  }
}

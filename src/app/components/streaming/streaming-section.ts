import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { StreamingSection }  from '../../shared/streaming-section/streaming-section';

@Component({
  selector: 'app-streaming',
  standalone: true,
  imports: [StreamingSection],
  templateUrl: './streaming.html',
})
export class Streaming implements OnInit {
  // default (cambialo se vuoi)
  videoId = 'KUVErTb94K0';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // supporta /prm/streaming/:id e /prm/streaming?v=ID
    const p = this.route.snapshot.paramMap.get('id');
    const q = this.route.snapshot.queryParamMap.get('v');
    if (p) this.videoId = p;
    if (q) this.videoId = q;
  }
}
